//MSSV:2123110137
//Truong Minh Tri
//CCQ2311D
//Ngay tao:16/5/2026
//Mo ta: Controller quan ly bai viet, Admin va Editor duoc them, sua, xoa bai viet

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using CMS.Data;
using CMS.Data.Entities;
using CMS.Backend.Models;
using CMS.Backend.Services;
using Microsoft.AspNetCore.Authorization;

namespace CMS.Backend.Controllers
{
    [Authorize(Roles = "Admin,Editor")]
    public class PostController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public PostController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        public async Task<IActionResult> Index(string? keyword, int? categoryId, string? sortOrder, int page = 1, int pageSize = 9)
        {
            var query = _context.Posts
                .Include(p => p.Category)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(keyword))
            {
                query = query.Where(p =>
                    p.Title.Contains(keyword) ||
                    p.Content.Contains(keyword) ||
                    p.Category.Name.Contains(keyword));
            }

            if (categoryId.HasValue)
            {
                query = query.Where(p => p.CategoryId == categoryId.Value);
            }

            query = sortOrder switch
            {
                "date_asc" => query.OrderBy(p => p.CreatedDate),
                "title_asc" => query.OrderBy(p => p.Title),
                "title_desc" => query.OrderByDescending(p => p.Title),
                _ => query.OrderByDescending(p => p.CreatedDate)
            };

            ViewBag.Keyword = keyword;
            ViewBag.CategoryId = categoryId;
            ViewBag.SortOrder = sortOrder;
            ViewBag.PageSize = pageSize;
            ViewBag.CategoryList = new SelectList(_context.Categories.OrderBy(c => c.Name), "Id", "Name", categoryId);

            var posts = await PaginatedList<Post>.CreateAsync(query.AsNoTracking(), page, pageSize);
            return View(posts);
        }

        public IActionResult Details(int id)
        {
            var post = _context.Posts
                .Include(p => p.Category)
                .FirstOrDefault(p => p.Id == id);

            if (post == null)
            {
                return NotFound();
            }

            return View(post);
        }

        [HttpGet]
        public IActionResult Create()
        {
            ViewBag.CategoryList = new SelectList(_context.Categories, "Id", "Name");
            return View(new Post
            {
                CreatedDate = DateTime.Now
            });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Post model, IFormFile? uploadImage)
        {
            model.ImageUrl ??= string.Empty;
            ModelState.Remove(nameof(Post.ImageUrl));
            ModelState.Remove(nameof(Post.Category));

            ValidatePostForm(model);

            if (!ModelState.IsValid)
            {
                ViewBag.CategoryList = new SelectList(_context.Categories, "Id", "Name", model.CategoryId);
                return View(model);
            }

            try
            {
                model.ImageUrl = await ImageUploadService.SaveImageAsync(uploadImage, _environment) ?? string.Empty;
            }
            catch (Exception ex) when (ex is InvalidOperationException || ex is IOException || ex is UnauthorizedAccessException)
            {
                ModelState.AddModelError("ImageUrl", ex.Message);
                ViewBag.CategoryList = new SelectList(_context.Categories, "Id", "Name", model.CategoryId);
                return View(model);
            }

            if (model.CreatedDate == default)
            {
                model.CreatedDate = DateTime.Now;
            }

            _context.Posts.Add(model);
            await _context.SaveChangesAsync();

            TempData["SuccessMessage"] = "Thêm bài viết thành công";
            return RedirectToAction("Index");
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            var post = _context.Posts.Find(id);

            if (post == null)
            {
                return NotFound();
            }

            ViewBag.CategoryList = new SelectList(_context.Categories, "Id", "Name", post.CategoryId);
            return View(post);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Post model, IFormFile? uploadImage)
        {
            ModelState.Remove(nameof(Post.ImageUrl));
            ModelState.Remove(nameof(Post.Category));

            if (uploadImage != null && uploadImage.Length > 0)
            {
                try
                {
                    model.ImageUrl = await ImageUploadService.SaveImageAsync(uploadImage, _environment) ?? string.Empty;
                }
                catch (Exception ex) when (ex is InvalidOperationException || ex is IOException || ex is UnauthorizedAccessException)
                {
                    ModelState.AddModelError("ImageUrl", ex.Message);
                    ViewBag.CategoryList = new SelectList(_context.Categories, "Id", "Name", model.CategoryId);
                    return View(model);
                }
            }
            else
            {
                var oldPost = _context.Posts.AsNoTracking().FirstOrDefault(p => p.Id == model.Id);

                if (oldPost != null && string.IsNullOrEmpty(model.ImageUrl))
                {
                    model.ImageUrl = oldPost.ImageUrl;
                }
            }

            model.ImageUrl ??= string.Empty;

            ValidatePostForm(model);

            if (!ModelState.IsValid)
            {
                ViewBag.CategoryList = new SelectList(_context.Categories, "Id", "Name", model.CategoryId);
                return View(model);
            }

            _context.Posts.Update(model);
            await _context.SaveChangesAsync();

            TempData["SuccessMessage"] = "Sửa bài viết thành công";
            return RedirectToAction("Index");
        }

        public IActionResult Delete(int id)
        {
            var post = _context.Posts.Find(id);

            if (post != null)
            {
                _context.Posts.Remove(post);
                _context.SaveChanges();

                TempData["SuccessMessage"] = "Xóa bài viết thành công";
            }

            return RedirectToAction("Index");
        }

        private void ValidatePostForm(Post model)
        {
            if (string.IsNullOrWhiteSpace(model.Title))
            {
                ModelState.AddModelError(nameof(Post.Title), "Tiêu đề bài viết không được để trống.");
            }

            if (string.IsNullOrWhiteSpace(model.Content))
            {
                ModelState.AddModelError(nameof(Post.Content), "Nội dung bài viết không được để trống.");
            }

            if (model.CategoryId <= 0 || !_context.Categories.Any(c => c.Id == model.CategoryId))
            {
                ModelState.AddModelError(nameof(Post.CategoryId), "Vui lòng chọn danh mục bài viết.");
            }
        }
    }
}
