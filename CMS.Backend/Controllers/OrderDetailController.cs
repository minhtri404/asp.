// MSSV: 2123110137
// Ho ten: Truong Minh Tri
// Lop: CCQ2311D
// Ngay tao: 16/5/2026
// Mo ta: Controller quan ly chi tiet don hang, su dung Include de lay thong tin don hang, khach hang va san pham

using CMS.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    public class OrderDetailController : Controller
    {
        private readonly ApplicationDbContext _context;

        public OrderDetailController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var data = _context.OrderDetails
                .Include(od => od.Order)
                .ThenInclude(o => o.Customer)
                .Include(od => od.Product)
                .ToList();

            return View(data);
        }
    }
}