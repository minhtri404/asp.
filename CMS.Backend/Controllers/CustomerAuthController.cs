//MSSV:2123110137
//Truong Minh Tri
//CCQ2311D
//Ngay tao:04/06/2026
//Mo ta: Controller hien thi form dang ky va dang nhap khach hang

using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    public class CustomerAuthController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CustomerAuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(Customer customer)
        {
            if (string.IsNullOrWhiteSpace(customer.FullName) ||
                string.IsNullOrWhiteSpace(customer.Email) ||
                string.IsNullOrWhiteSpace(customer.Password))
            {
                ViewBag.Error = "Vui lòng nhập đầy đủ họ tên, email và mật khẩu";
                return View(customer);
            }

            var email = customer.Email.Trim().ToLower();

            var emailExists = await _context.Customers
                .AnyAsync(x => x.Email.ToLower().Trim() == email);

            if (emailExists)
            {
                ViewBag.Error = "Email đã tồn tại";
                return View(customer);
            }

            customer.Email = email;
            customer.FullName = customer.FullName.Trim();
            customer.Password = customer.Password.Trim();

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            TempData["Success"] = "Đăng ký thành viên thành công";
            return RedirectToAction("Login");
        }
    }
}