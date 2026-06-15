//MSSV:2123110137
//Truong Minh Tri
//CCQ2311D
//Ngay tao:16/5/2026
//Mo ta: Controller quan ly thanh vien, Admin duoc thao tac, Editor chi duoc xem

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Authorization;

namespace CMS.Backend.Controllers
{
    [Authorize(Roles = "Admin,Editor")]
    public class UserController : Controller
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        private bool IsEditor()
        {
            return User.IsInRole("Editor");
        }

        private IActionResult EditorNoPermission()
        {
            TempData["ErrorMessage"] = "Editor chỉ được xem dữ liệu, không được thêm, sửa hoặc xóa thành viên.";
            return RedirectToAction(nameof(Index));
        }

        public IActionResult Index()
        {
            var users = _context.Users.ToList();
            return View(users);
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
        public IActionResult Create(User model)
        {
            if (IsEditor())
            {
                return EditorNoPermission();
            }

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
            if (IsEditor())
            {
                return EditorNoPermission();
            }

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
            if (IsEditor())
            {
                return EditorNoPermission();
            }

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
            if (IsEditor())
            {
                return EditorNoPermission();
            }

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
