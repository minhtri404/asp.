//MSSV:2123110137
//Truong Minh Tri
//CCQ2311D
//Ngay tao:04/06/2026
//Mo ta: Controller quan tri chi tiet don hang, Admin duoc thao tac, Editor chi duoc xem

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
    public class OrderDetailController : Controller
    {
        private readonly ApplicationDbContext _context;

        public OrderDetailController(ApplicationDbContext context)
        {
            _context = context;
        }

        private bool IsEditor()
        {
            return User.IsInRole("Editor");
        }

        private IActionResult EditorNoPermission()
        {
            TempData["ErrorMessage"] = "Editor chỉ được xem dữ liệu, không được xóa chi tiết đơn hàng.";
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Index(string? keyword, int? productId, int? status, string? sortOrder, int page = 1, int pageSize = 10)
        {
            var query = _context.OrderDetails
                .Include(od => od.Order)
                .ThenInclude(o => o.Customer)
                .Include(od => od.Product)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(keyword))
            {
                query = query.Where(od =>
                    od.Id.ToString().Contains(keyword) ||
                    od.OrderId.ToString().Contains(keyword) ||
                    (od.Product != null && od.Product.Name.Contains(keyword)) ||
                    (od.Order != null && od.Order.Customer != null && (
                        od.Order.Customer.FullName.Contains(keyword) ||
                        od.Order.Customer.Email.Contains(keyword))));
            }

            if (productId.HasValue)
            {
                query = query.Where(od => od.ProductId == productId.Value);
            }

            if (status.HasValue)
            {
                query = query.Where(od => od.Order != null && od.Order.Status == status.Value);
            }

            query = sortOrder switch
            {
                "quantity_asc" => query.OrderBy(od => od.Quantity),
                "quantity_desc" => query.OrderByDescending(od => od.Quantity),
                "price_asc" => query.OrderBy(od => od.UnitPrice),
                "price_desc" => query.OrderByDescending(od => od.UnitPrice),
                "total_asc" => query.OrderBy(od => od.Quantity * od.UnitPrice),
                "total_desc" => query.OrderByDescending(od => od.Quantity * od.UnitPrice),
                _ => query.OrderByDescending(od => od.Id)
            };

            ViewBag.Keyword = keyword;
            ViewBag.ProductId = productId;
            ViewBag.Status = status;
            ViewBag.SortOrder = sortOrder;
            ViewBag.PageSize = pageSize;
            ViewBag.ProductList = new SelectList(_context.Products.OrderBy(p => p.Name), "Id", "Name", productId);

            var data = await PaginatedList<OrderDetail>.CreateAsync(query.AsNoTracking(), page, pageSize);
            return View(data);
        }

        public async Task<IActionResult> Details(int id)
        {
            var detail = await _context.OrderDetails
                .Include(od => od.Order)
                .ThenInclude(o => o.Customer)
                .Include(od => od.Product)
                .FirstOrDefaultAsync(od => od.Id == id);

            if (detail == null)
            {
                return NotFound();
            }

            return View(detail);
        }

        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            if (IsEditor())
            {
                return EditorNoPermission();
            }

            var detail = await _context.OrderDetails
                .Include(od => od.Order)
                .ThenInclude(o => o.Customer)
                .Include(od => od.Product)
                .FirstOrDefaultAsync(od => od.Id == id);

            if (detail == null)
            {
                return NotFound();
            }

            return View(detail);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (IsEditor())
            {
                return EditorNoPermission();
            }

            var detail = await _context.OrderDetails.FindAsync(id);

            if (detail == null)
            {
                return NotFound();
            }

            _context.OrderDetails.Remove(detail);
            await _context.SaveChangesAsync();

            TempData["SuccessMessage"] = "Xóa chi tiết đơn hàng thành công";
            return RedirectToAction(nameof(Index));
        }
    }
}
