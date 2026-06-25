//MSSV:2123110137
//Truong Minh Tri
//CCQ2311D
//Ngay tao:04/06/2026
//Mo ta: Controller quan tri CRUD danh muc, Admin va Editor duoc thao tac

using CMS.Data;
using CMS.Data.Entities;
using CMS.Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    [Authorize(Roles = "Admin,Editor")]
    public class CategoryController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CategoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index(string? keyword, string? sortOrder, int page = 1, int pageSize = 10)
        {
            var query = _context.Categories.AsQueryable();

            if (!string.IsNullOrWhiteSpace(keyword))
            {
                query = query.Where(c =>
                    c.Name.Contains(keyword) ||
                    (c.Description != null && c.Description.Contains(keyword)));
            }

            query = sortOrder switch
            {
                "name_desc" => query.OrderByDescending(c => c.Name),
                "id_desc" => query.OrderByDescending(c => c.Id),
                _ => query.OrderBy(c => c.Name)
            };

            ViewBag.Keyword = keyword;
            ViewBag.SortOrder = sortOrder;
            ViewBag.PageSize = pageSize;

            var data = await PaginatedList<Category>.CreateAsync(query.AsNoTracking(), page, pageSize);
            return View(data);
        }

        public async Task<IActionResult> Details(int id)
        {
            var category = await _context.Categories
                .Include(c => c.Posts)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
            {
                return NotFound();
            }

            return View(category);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Category model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            model.Description ??= string.Empty;

            _context.Categories.Add(model);
            await _context.SaveChangesAsync();

            TempData["SuccessMessage"] = "Thêm danh mục thành công";
            return RedirectToAction(nameof(Index));
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return View(category);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, Category model)
        {
            if (id != model.Id)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return View(model);
            }

            model.Description ??= string.Empty;

            _context.Categories.Update(model);
            await _context.SaveChangesAsync();

            TempData["SuccessMessage"] = "Cập nhật danh mục thành công";
            return RedirectToAction(nameof(Index));
        }

        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            var category = await _context.Categories
                            .Include(c => c.Posts)
                            .FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
            {
                return NotFound();
            }

            return View(category);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var category = await _context.Categories
                            .Include(c => c.Posts)
                            .FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
            {
                return NotFound();
            }

            if (category.Posts != null && category.Posts.Any())
            {
                TempData["ErrorMessage"] = "Không thể xóa vì danh mục đang có bài viết.";
                return RedirectToAction(nameof(Index));
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            TempData["SuccessMessage"] = "Xóa danh mục thành công";
            return RedirectToAction(nameof(Index));
        }
    }
}

