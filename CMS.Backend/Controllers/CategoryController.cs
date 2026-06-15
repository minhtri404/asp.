//MSSV:2123110137
//Truong Minh Tri
//CCQ2311D
//Ngay tao:04/06/2026
//Mo ta: Controller quan tri CRUD danh muc, Admin duoc thao tac, Editor chi duoc xem

using CMS.Data;
using CMS.Data.Entities;
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

        public async Task<IActionResult> Index()
        {
            var data = await _context.Categories
                .OrderBy(c => c.Id)
                .ToListAsync();

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
            if (User.IsInRole("Editor"))
            {
                TempData["ErrorMessage"] = "403, Editor chỉ được xem, không được thêm danh mục.";
                return RedirectToAction(nameof(Index));
            }

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Category model)
        {
            if (User.IsInRole("Editor"))
            {
                TempData["ErrorMessage"] = "Editor không có quyền thêm danh mục.";
                return RedirectToAction(nameof(Index));
            }

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
            if (User.IsInRole("Editor"))
            {
                TempData["ErrorMessage"] = "Editor chỉ được xem, không được sửa danh mục.";
                return RedirectToAction(nameof(Index));
            }

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
            if (User.IsInRole("Editor"))
            {
                TempData["ErrorMessage"] = "Editor không có quyền sửa danh mục.";
                return RedirectToAction(nameof(Index));
            }

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
            if (User.IsInRole("Editor"))
            {
                TempData["ErrorMessage"] = "Editor không có quyền xóa danh mục.";
                return RedirectToAction(nameof(Index));
            }

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
            if (User.IsInRole("Editor"))
            {
                TempData["ErrorMessage"] = "Editor không có quyền xóa danh mục.";
                return RedirectToAction(nameof(Index));
            }

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