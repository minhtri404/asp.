//MSSV:2123110137
//Truong Minh Tri
//CCQ2311D
//Ngay tao:16/5/2026
//Mo ta: Controller quan ly thanh vien, chi Admin duoc truy cap

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data;
using CMS.Data.Entities;
using CMS.Backend.Models;
using Microsoft.AspNetCore.Authorization;

namespace CMS.Backend.Controllers
{
    [Authorize(Roles = "Admin")]
    public class UserController : Controller
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index(string? keyword, string? role, string? sortOrder, int page = 1, int pageSize = 10)
        {
            var query = _context.Users.AsQueryable();

            if (!string.IsNullOrWhiteSpace(keyword))
            {
                query = query.Where(u =>
                    u.Username.Contains(keyword) ||
                    u.FullName.Contains(keyword) ||
                    u.Role.Contains(keyword));
            }

            if (!string.IsNullOrWhiteSpace(role))
            {
                query = query.Where(u => u.Role == role);
            }

            query = sortOrder switch
            {
                "name_desc" => query.OrderByDescending(u => u.FullName),
                "role_asc" => query.OrderBy(u => u.Role).ThenBy(u => u.FullName),
                "role_desc" => query.OrderByDescending(u => u.Role).ThenBy(u => u.FullName),
                _ => query.OrderBy(u => u.FullName)
            };

            ViewBag.Keyword = keyword;
            ViewBag.Role = role;
            ViewBag.SortOrder = sortOrder;
            ViewBag.PageSize = pageSize;

            var users = await PaginatedList<User>.CreateAsync(query.AsNoTracking(), page, pageSize);
            return View(users);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(User model)
        {
            var checkExist = _context.Users.Any(u => u.Username == model.Username);

            if (checkExist)
            {
                ModelState.AddModelError("Username", "Tên đăng nhập này đã tồn tại");
                return View(model);
            }

            _context.Users.Add(model);
            _context.SaveChanges();

            TempData["SuccessMessage"] = "Thêm thành viên thành công";
            return RedirectToAction(nameof(Index));
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            var user = _context.Users.Find(id);

            if (user == null)
            {
                return NotFound();
            }

            return View(user);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(User model, string? NewPassword)
        {
            var existingUser = _context.Users.AsNoTracking().FirstOrDefault(u => u.Id == model.Id);

            if (existingUser == null)
            {
                return NotFound();
            }

            if (!string.IsNullOrEmpty(NewPassword))
            {
                model.PasswordHash = NewPassword;
            }
            else
            {
                model.PasswordHash = existingUser.PasswordHash;
            }

            _context.Users.Update(model);
            _context.SaveChanges();

            TempData["SuccessMessage"] = "Sửa thành viên thành công";
            return RedirectToAction(nameof(Index));
        }

        public IActionResult Delete(int id)
        {
            var user = _context.Users.Find(id);

            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();

                TempData["SuccessMessage"] = "Xóa thành viên thành công";
            }

            return RedirectToAction(nameof(Index));
        }
    }
}
