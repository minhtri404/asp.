//MSSV:2123110137
//Truong Minh Tri
//CCQ2311D
//Ngay tao:04/06/2026
//Mo ta: Controller quan tri CRUD san pham, Admin duoc thao tac, Editor chi duoc xem

using CMS.Data;
using CMS.Data.Entities;
using CMS.Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    [Authorize(Roles = "Admin,Editor")]
    public class ProductController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ProductController(ApplicationDbContext context)
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

        public async Task<IActionResult> Index(string? keyword, int? categoryProductId, decimal? minPrice, decimal? maxPrice, string? sortOrder, int page = 1, int pageSize = 9)
        {
            var query = _context.Products
                .Include(p => p.CategoryProduct)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(keyword))
            {
                query = query.Where(p =>
                    p.Name.Contains(keyword) ||
                    (p.Description != null && p.Description.Contains(keyword)) ||
                    (p.CategoryProduct != null && p.CategoryProduct.Name.Contains(keyword)));
            }

            if (categoryProductId.HasValue)
            {
                query = query.Where(p => p.CategoryProductId == categoryProductId.Value);
            }

            if (minPrice.HasValue)
            {
                query = query.Where(p => p.Price >= minPrice.Value);
            }

            if (maxPrice.HasValue)
            {
                query = query.Where(p => p.Price <= maxPrice.Value);
            }

            query = sortOrder switch
            {
                "price_asc" => query.OrderBy(p => p.Price),
                "price_desc" => query.OrderByDescending(p => p.Price),
                "stock_asc" => query.OrderBy(p => p.StockQuantity),
                "stock_desc" => query.OrderByDescending(p => p.StockQuantity),
                _ => query.OrderBy(p => p.Name)
            };

            ViewBag.Keyword = keyword;
            ViewBag.CategoryProductId = categoryProductId;
            ViewBag.MinPrice = minPrice;
            ViewBag.MaxPrice = maxPrice;
            ViewBag.SortOrder = sortOrder;
            ViewBag.PageSize = pageSize;
            ViewBag.CategoryProductList = new SelectList(_context.CategoriesProducts.OrderBy(c => c.Name), "Id", "Name", categoryProductId);

            var data = await PaginatedList<Product>.CreateAsync(query.AsNoTracking(), page, pageSize);
            return View(data);
        }

        public async Task<IActionResult> Details(int id)
        {
            var product = await _context.Products
                .Include(p => p.CategoryProduct)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            return View(product);
        }

        [HttpGet]
        public IActionResult Create()
        {
            if (IsEditor())
            {
                return EditorNoPermission();
            }

            LoadCategoryProductList();
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Product model, IFormFile? uploadImage)
        {
            if (IsEditor())
            {
                return EditorNoPermission();
            }

            if (!ModelState.IsValid)
            {
                LoadCategoryProductList(model.CategoryProductId);
                return View(model);
            }

            model.ImageUrl = await SaveImageAsync(uploadImage);
            model.Description ??= string.Empty;

            _context.Products.Add(model);
            await _context.SaveChangesAsync();

            TempData["SuccessMessage"] = "Thêm sản phẩm thành công";
            return RedirectToAction(nameof(Index));
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            if (IsEditor())
            {
                return EditorNoPermission();
            }

            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            LoadCategoryProductList(product.CategoryProductId);
            return View(product);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, Product model, IFormFile? uploadImage)
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
                LoadCategoryProductList(model.CategoryProductId);
                return View(model);
            }

            var oldProduct = await _context.Products.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);
            if (oldProduct == null)
            {
                return NotFound();
            }

            var newImageUrl = await SaveImageAsync(uploadImage);
            model.ImageUrl = string.IsNullOrEmpty(newImageUrl) ? oldProduct.ImageUrl : newImageUrl;
            model.Description ??= string.Empty;

            _context.Products.Update(model);
            await _context.SaveChangesAsync();

            TempData["SuccessMessage"] = "Cập nhật sản phẩm thành công";
            return RedirectToAction(nameof(Index));
        }

        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            if (IsEditor())
            {
                return EditorNoPermission();
            }

            var product = await _context.Products
                .Include(p => p.CategoryProduct)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            return View(product);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (IsEditor())
            {
                return EditorNoPermission();
            }

            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            var hasOrderDetail = await _context.OrderDetails.AnyAsync(od => od.ProductId == id);
            if (hasOrderDetail)
            {
                TempData["ErrorMessage"] = "Không thể xóa vì sản phẩm đã phát sinh đơn hàng";
                return RedirectToAction(nameof(Index));
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            TempData["SuccessMessage"] = "Xóa sản phẩm thành công";
            return RedirectToAction(nameof(Index));
        }

        private void LoadCategoryProductList(int? selectedId = null)
        {
            ViewBag.CategoryProductList = new SelectList(
                _context.CategoriesProducts.OrderBy(c => c.Name).ToList(),
                "Id",
                "Name",
                selectedId);
        }

        private async Task<string?> SaveImageAsync(IFormFile? uploadImage)
        {
            if (uploadImage == null || uploadImage.Length == 0)
            {
                return null;
            }

            var folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }

            var fileName = Guid.NewGuid() + Path.GetExtension(uploadImage.FileName);
            var filePath = Path.Combine(folder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await uploadImage.CopyToAsync(stream);
            }

            return "/uploads/" + fileName;
        }
    }
}
