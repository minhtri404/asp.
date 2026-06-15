//MSSV:2123110137
//Truong Minh Tri
//CCQ2311D
//Ngay tao:06/06/2026
//Mo ta: API quan ly User Admin/Editor

using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers.Api
{
    [Route("api/Users")]
    [ApiController]
    public class UsersApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _context.Users
                .OrderBy(u => u.Id)
                .Select(u => new
                {
                    u.Id,
                    u.Username,
                    u.FullName,
                    u.Role
                })
                .ToListAsync();

            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _context.Users
                .Where(u => u.Id == id)
                .Select(u => new    
                {
                    u.Id,
                    u.Username,
                    u.FullName,
                    u.Role
                })
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound(new { message = "Không tìm thấy thành viên" });
            }

            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> Create(UserCreateRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Username) ||
                string.IsNullOrWhiteSpace(request.FullName) ||
                string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new { message = "Vui lòng nhập đầy đủ thông tin" });
            }

            var username = request.Username.Trim().ToLower();

            var exists = await _context.Users
                .AnyAsync(u => u.Username.ToLower().Trim() == username);

            if (exists)
            {
                return BadRequest(new { message = "Tên đăng nhập đã tồn tại" });
            }

            var user = new User
            {
                Username = username,
                FullName = request.FullName.Trim(),
                PasswordHash = request.Password.Trim(),
                Role = string.IsNullOrWhiteSpace(request.Role) ? "Editor" : request.Role
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Thêm thành viên thành công",
                user = new
                {
                    user.Id,
                    user.Username,
                    user.FullName,
                    user.Role
                }
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UserUpdateRequest request)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound(new { message = "Không tìm thấy thành viên" });
            }

            if (string.IsNullOrWhiteSpace(request.FullName))
            {
                return BadRequest(new { message = "Vui lòng nhập họ tên" });
            }

            user.FullName = request.FullName.Trim();
            user.Role = string.IsNullOrWhiteSpace(request.Role) ? user.Role : request.Role;

            if (!string.IsNullOrWhiteSpace(request.Password))
            {
                user.PasswordHash = request.Password.Trim();
            }

            await _context.SaveChangesAsync();

            return Ok(new { message = "Cập nhật thành viên thành công" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound(new { message = "Không tìm thấy thành viên" });
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Xóa thành viên thành công" });
        }
    }

    public class UserCreateRequest
    {
        public string Username { get; set; }
        public string FullName { get; set; }
        public string Password { get; set; }
        public string? Role { get; set; }
    }

    public class UserUpdateRequest
    {
        public string FullName { get; set; }
        public string? Password { get; set; }
        public string? Role { get; set; }
    }
}