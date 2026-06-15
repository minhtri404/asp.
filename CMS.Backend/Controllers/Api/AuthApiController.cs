//MSSV:2123110137
//Truong Minh Tri
//CCQ2311D
//Ngay tao:04/06/2026
//Mo ta: API dang ky va dang nhap khach hang cho ReactJS

using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers.Api
{
    [Route("api/Auth")]
    [ApiController]
    public class AuthApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthApiController(ApplicationDbContext context)  
        {
            _context = context;
        }

        [HttpPost("CustomerRegister")]
        public async Task<IActionResult> CustomerRegister(CustomerRegisterRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.FullName) ||
                string.IsNullOrWhiteSpace(request.Email) ||
                string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new
                {
                    message = "Vui lòng nhập đầy đủ họ tên, email và mật khẩu"
                });
            }

            var email = request.Email.Trim().ToLower();

            var emailExists = await _context.Customers
                .AnyAsync(c => c.Email.ToLower().Trim() == email);

            if (emailExists)
            {
                return BadRequest(new
                {
                    message = "Email đã tồn tại"
                });
            }

            var customer = new Customer
            {
                FullName = request.FullName.Trim(),
                Email = email,
                Password = request.Password.Trim(),
                Phone = request.Phone,
                Address = request.Address
            };

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Đăng ký thành công",
                customerId = customer.Id,
                fullName = customer.FullName,
                email = customer.Email
            });
        }

        [HttpPost("CustomerLogin")]
        public async Task<IActionResult> CustomerLogin(CustomerLoginRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Email) ||
                string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new
                {
                    message = "Vui lòng nhập email và mật khẩu"
                });
            }

            var email = request.Email.Trim().ToLower();
            var password = request.Password.Trim();

            var customer = await _context.Customers
                .FirstOrDefaultAsync(x =>
                    x.Email.ToLower().Trim() == email
                    && x.Password == password
                );

            if (customer == null)
            {
                return BadRequest(new
                {
                    message = "Email hoặc mật khẩu không đúng"
                });
            }

            return Ok(new
            {
                message = "Đăng nhập thành công",
                customer = new
                {
                    id = customer.Id,
                    fullName = customer.FullName,
                    email = customer.Email,
                    phone = customer.Phone,
                    address = customer.Address
                }
            });
        }
    }

    public class CustomerRegisterRequest
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
    }

    public class CustomerLoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}