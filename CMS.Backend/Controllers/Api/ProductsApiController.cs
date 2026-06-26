//MSSV:2123110137
//Truong Minh Tri
//CCQ2311D
//Ngay tao:04/06/2026
//Mo ta: API lay danh sach san pham, loc san pham theo danh muc va chi tiet san pham

using CMS.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers.Api
{
    [Route("api/Products")]
    [ApiController]
    public class ProductsApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _context.Products
                .Include(p => p.CategoryProduct)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Description,
                    p.Price,
                    p.StockQuantity,
                    p.ImageUrl,
                    p.CategoryProductId,
                    CategoryProductName = p.CategoryProduct.Name
                })
                .ToListAsync();

            return Ok(products);
        }

        [HttpGet("category/{categoryProductId}")]
        public async Task<IActionResult> GetProductsByCategory(int categoryProductId)
        {
            var products = await _context.Products
                .Include(p => p.CategoryProduct)
                .Where(p => p.CategoryProductId == categoryProductId)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Description,
                    p.Price,
                    p.StockQuantity,
                    p.ImageUrl,
                    p.CategoryProductId,
                    CategoryProductName = p.CategoryProduct.Name
                })
                .ToListAsync();

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _context.Products
                .Include(p => p.CategoryProduct)
                .Where(p => p.Id == id)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Description,
                    p.Price,
                    p.StockQuantity,
                    p.ImageUrl,
                    p.CategoryProductId,
                    CategoryProductName = p.CategoryProduct.Name
                })
                .FirstOrDefaultAsync();

            if (product == null)
            {
                return NotFound(new
                {
                    message = "Không tìm thấy sản phẩm"
                });
            }

            return Ok(product);
        }
    }
}
