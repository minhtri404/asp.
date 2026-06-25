//MSSV:2123110137
//Truong Minh Tri
//CCQ2311D
//Ngay tao:04/06/2026
//Mo ta: Controller quan tri don hang, Admin va Editor duoc thao tac

using CMS.Data;
using CMS.Data.Entities;
using CMS.Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    [Authorize(Roles = "Admin,Editor")]
    public class OrderController : Controller
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index(string? keyword, int? status, DateTime? fromDate, DateTime? toDate, string? sortOrder, int page = 1, int pageSize = 10)
        {
            var query = _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.OrderDetails)
                .ThenInclude(od => od.Product)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(keyword))
            {
                query = query.Where(o =>
                    o.Id.ToString().Contains(keyword) ||
                    (o.Customer != null && (
                        o.Customer.FullName.Contains(keyword) ||
                        o.Customer.Email.Contains(keyword))) ||
                    (o.Notes != null && o.Notes.Contains(keyword)));
            }

            if (status.HasValue)
            {
                query = query.Where(o => o.Status == status.Value);
            }

            if (fromDate.HasValue)
            {
                query = query.Where(o => o.OrderDate >= fromDate.Value.Date);
            }

            if (toDate.HasValue)
            {
                query = query.Where(o => o.OrderDate < toDate.Value.Date.AddDays(1));
            }

            query = sortOrder switch
            {
                "date_asc" => query.OrderBy(o => o.OrderDate),
                "total_asc" => query.OrderBy(o => o.OrderDetails!.Sum(od => od.Quantity * od.UnitPrice)),
                "total_desc" => query.OrderByDescending(o => o.OrderDetails!.Sum(od => od.Quantity * od.UnitPrice)),
                "status_asc" => query.OrderBy(o => o.Status).ThenByDescending(o => o.OrderDate),
                _ => query.OrderByDescending(o => o.OrderDate)
            };

            ViewBag.Keyword = keyword;
            ViewBag.Status = status;
            ViewBag.FromDate = fromDate?.ToString("yyyy-MM-dd");
            ViewBag.ToDate = toDate?.ToString("yyyy-MM-dd");
            ViewBag.SortOrder = sortOrder;
            ViewBag.PageSize = pageSize;

            var orders = await PaginatedList<Order>.CreateAsync(query.AsNoTracking(), page, pageSize);
            return View(orders);
        }

        public async Task<IActionResult> Details(int id)
        {
            var order = await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.OrderDetails)
                .ThenInclude(od => od.Product)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return NotFound();
            }

            return View(order);
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var order = await _context.Orders
                            .Include(o => o.Customer)
                            .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return NotFound();
            }

            return View(order);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, int status, string? notes)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            order.Status = status;
            order.Notes = notes;
            await _context.SaveChangesAsync();

            TempData["SuccessMessage"] = "Cập nhật đơn hàng thành công";
            return RedirectToAction(nameof(Index));
        }

        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            var order = await _context.Orders
                            .Include(o => o.Customer)
                            .Include(o => o.OrderDetails)
                            .ThenInclude(od => od.Product)
                            .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return NotFound();
            }

            return View(order);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var order = await _context.Orders
                            .Include(o => o.OrderDetails)
                            .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return NotFound();
            }

            if (order.OrderDetails != null && order.OrderDetails.Any())
            {
                _context.OrderDetails.RemoveRange(order.OrderDetails);
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            TempData["SuccessMessage"] = "Xóa đơn hàng thành công";
            return RedirectToAction(nameof(Index));
        }
    }
}

