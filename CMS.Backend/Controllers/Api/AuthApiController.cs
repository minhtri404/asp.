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
            var emailExists = await _context.Customers
                .AnyAsync(c => c.Email == request.Email);

            if (emailExists)
            {
                return BadRequest(new
                {
                    message = "Email đã tồn tại"
                });
            }

            var customer = new Customer
            {
                FullName = request.FullName,
                Email = request.Email,
                Password = request.Password,
                Phone = request.Phone,
                Address = request.Address
            };

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Đăng ký thành công",
                customerId = customer.Id,
                customer.FullName,
                customer.Email
            });
        }

        [HttpPost("CustomerLogin")]
        public async Task<IActionResult> CustomerLogin(CustomerLoginRequest request)
        {
            var customer = await _context.Customers
                .FirstOrDefaultAsync(c =>
                    c.Email == request.Email &&
                    c.Password == request.Password);

            if (customer == null)
            {
                return Unauthorized(new
                {
                    message = "Email hoặc mật khẩu không đúng"
                });
            }

            return Ok(new
            {
                message = "Đăng nhập thành công",
                customerId = customer.Id,
                customer.FullName,
                customer.Email,
                customer.Phone,
                customer.Address
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