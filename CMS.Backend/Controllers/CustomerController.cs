//MSSV:2123110137
//Truong Minh Tri
//CCQ2311D
//Ngay tao:16/5/2026
//Mo ta: Controller quan ly khach hang, su dung LINQ de tim kiem du lieu

using Microsoft.AspNetCore.Mvc;
using CMS.Data;

namespace CMS.Backend.Controllers
{
    public class CustomerController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CustomerController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index(string keyword)
        {
            var query = _context.Customers.AsQueryable();

            if (!string.IsNullOrEmpty(keyword))
            {
                query = query.Where(c =>
                    c.FullName.Contains(keyword) ||
                    c.Email.Contains(keyword) ||
                    c.Phone.Contains(keyword) ||
                    c.Address.Contains(keyword));
            }

            var customers = query
                .OrderBy(c => c.FullName)
                .ToList();

            ViewBag.Keyword = keyword;

            return View(customers);
        }
    }
}