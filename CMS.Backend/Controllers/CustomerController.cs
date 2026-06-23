//MSSV:2123110137
//Truong Minh Tri
//CCQ2311D
//Ngay tao:04/06/2026
//Mo ta: Controller quan tri CRUD khach hang, Admin duoc thao tac, Editor chi duoc xem

using CMS.Data;
using CMS.Data.Entities;
using CMS.Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    [Authorize(Roles = "Admin,Editor")]
    public class CustomerController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CustomerController(ApplicationDbContext context)
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
            var query = _context.Customers.AsQueryable();

            if (!string.IsNullOrWhiteSpace(keyword))
            {
                query = query.Where(c =>
                    c.FullName.Contains(keyword) ||
                    c.Email.Contains(keyword) ||
                    (c.Phone != null && c.Phone.Contains(keyword)) ||
                    (c.Address != null && c.Address.Contains(keyword)));
            }

            query = sortOrder switch
            {
                "name_desc" => query.OrderByDescending(c => c.FullName),
                "email_asc" => query.OrderBy(c => c.Email),
                "email_desc" => query.OrderByDescending(c => c.Email),
                _ => query.OrderBy(c => c.FullName)
            };

            ViewBag.Keyword = keyword;
            ViewBag.SortOrder = sortOrder;
            ViewBag.PageSize = pageSize;

            var data = await PaginatedList<Customer>.CreateAsync(query.AsNoTracking(), page, pageSize);
            return View(data);
        }

        public async Task<IActionResult> Details(int id)
        {
            var customer = await _context.Customers
                .Include(c => c.Orders)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (customer == null)
            {
                return NotFound();
            }

            return View(customer);
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
        public async Task<IActionResult> Create(Customer model)
        {
            if (IsEditor())
            {
                return EditorNoPermission();
            }

            if (await _context.Customers.AnyAsync(c => c.Email == model.Email))
            {
                ModelState.AddModelError("Email", "Email này đã tồn tại");
            }

            if (!ModelState.IsValid)
            {
                return View(model);
            }

            model.Phone ??= string.Empty;
            model.Address ??= string.Empty;

            _context.Customers.Add(model);
            await _context.SaveChangesAsync();

            TempData["SuccessMessage"] = "Thêm khách hàng thành công";
            return RedirectToAction(nameof(Index));
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            if (IsEditor())
            {
                return EditorNoPermission();
            }

            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            return View(customer);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, Customer model, string? NewPassword)
        {
            if (IsEditor())
            {
                return EditorNoPermission();
            }

            if (id != model.Id)
            {
                return NotFound();
            }

            var oldCustomer = await _context.Customers.AsNoTracking().FirstOrDefaultAsync(c => c.Id == id);
            if (oldCustomer == null)
            {
                return NotFound();
            }

            if (await _context.Customers.AnyAsync(c => c.Email == model.Email && c.Id != id))
            {
                ModelState.AddModelError("Email", "Email này đã tồn tại");
            }

            if (string.IsNullOrWhiteSpace(NewPassword))
            {
                model.Password = oldCustomer.Password;
                ModelState.Remove("Password");
            }
            else
            {
                model.Password = NewPassword;
            }

            if (!ModelState.IsValid)
            {
                return View(model);
            }

            model.Phone ??= string.Empty;
            model.Address ??= string.Empty;

            _context.Customers.Update(model);
            await _context.SaveChangesAsync();

            TempData["SuccessMessage"] = "Cập nhật khách hàng thành công";
            return RedirectToAction(nameof(Index));
        }

        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            if (IsEditor())
            {
                return EditorNoPermission();
            }

            var customer = await _context.Customers
                .Include(c => c.Orders)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (customer == null)
            {
                return NotFound();
            }

            return View(customer);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (IsEditor())
            {
                return EditorNoPermission();
            }

            var customer = await _context.Customers
                .Include(c => c.Orders)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (customer == null)
            {
                return NotFound();
            }

            if (customer.Orders != null && customer.Orders.Any())
            {
                TempData["ErrorMessage"] = "Không thể xóa vì khách hàng đã có đơn hàng";
                return RedirectToAction(nameof(Index));
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            TempData["SuccessMessage"] = "Xóa khách hàng thành công";
            return RedirectToAction(nameof(Index));
        }
    }
}
