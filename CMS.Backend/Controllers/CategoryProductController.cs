//MSSV:2123110137
//Truong Minh Tri
//CCQ2311D
//Ngay tao:04/06/2026
//Mo ta: Controller quan tri CRUD danh muc san pham, Admin duoc thao tac, Editor chi duoc xem

using CMS.Data;
using CMS.Data.Entities;
using CMS.Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    [Authorize(Roles = "Admin,Editor")]
    public class CategoryProductController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CategoryProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        private bool IsEditor()
        {
            return User.IsInRole("Editor");
        }

        private IActionResult EditorNoPermission()
        {
            TempData["ErrorMessage"] = "Editor chỉ được xem dữ liệu, không được thêm, sửa hoặc xóa.";
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Index(string? keyword, string? sortOrder, int page = 1, int pageSize = 10)
        {
            var query = _context.CategoriesProducts.AsQueryable();

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

            var data = await PaginatedList<CategoryProduct>.CreateAsync(query.AsNoTracking(), page, pageSize);
            return View(data);
        }

        public async Task<IActionResult> Details(int id)
        {
            var categoryProduct = await _context.CategoriesProducts
                .Include(c => c.Products)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (categoryProduct == null)
            {
                return NotFound();
            }

            return View(categoryProduct);
        }

        [HttpGet]
        public IActionResult Create()
        {
            if (IsEditor())
            {
                return EditorNoPermission();
            }

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(CategoryProduct model)
        {
            if (IsEditor())
            {
                return EditorNoPermission();
            }

            if (!ModelState.IsValid)
            {
                return View(model);
            }

            model.Description ??= string.Empty;
            _context.CategoriesProducts.Add(model);
            await _context.SaveChangesAsync();

            TempData["SuccessMessage"] = "Thêm danh mục sản phẩm thành công";
            return RedirectToAction(nameof(Index));
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            if (IsEditor())
            {
                return EditorNoPermission();
            }

            var categoryProduct = await _context.CategoriesProducts.FindAsync(id);

            if (categoryProduct == null)
            {
                return NotFound();
            }

            return View(categoryProduct);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, CategoryProduct model)
        {
            if (IsEditor())
            {
                return EditorNoPermission();
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
            _context.CategoriesProducts.Update(model);
            await _context.SaveChangesAsync();

            TempData["SuccessMessage"] = "Cập nhật danh mục sản phẩm thành công";
            return RedirectToAction(nameof(Index));
        }

        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            if (IsEditor())
            {
                return EditorNoPermission();
            }

            var categoryProduct = await _context.CategoriesProducts
                .Include(c => c.Products)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (categoryProduct == null)
            {
                return NotFound();
            }

            return View(categoryProduct);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (IsEditor())
            {
                return EditorNoPermission();
            }

            var categoryProduct = await _context.CategoriesProducts
                .Include(c => c.Products)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (categoryProduct == null)
            {
                return NotFound();
            }

            if (categoryProduct.Products != null && categoryProduct.Products.Any())
            {
                TempData["ErrorMessage"] = "Không thể xóa vì danh mục đang có sản phẩm";
                return RedirectToAction(nameof(Index));
            }

            _context.CategoriesProducts.Remove(categoryProduct);
            await _context.SaveChangesAsync();

            TempData["SuccessMessage"] = "Xóa danh mục sản phẩm thành công";
            return RedirectToAction(nameof(Index));
        }
    }
}
