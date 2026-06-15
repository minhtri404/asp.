//MSSV:2123110137
//Truong Minh Tri
//CCQ2311D
//Ngay tao:04/06/2026
//Mo ta: Controller quan tri chi tiet don hang, Admin duoc thao tac, Editor chi duoc xem

using CMS.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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

        public async Task<IActionResult> Index()
        {
            var data = await _context.OrderDetails
                .Include(od => od.Order)
                .ThenInclude(o => o.Customer)
                .Include(od => od.Product)
                .OrderByDescending(od => od.Id)
                .ToListAsync();

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
