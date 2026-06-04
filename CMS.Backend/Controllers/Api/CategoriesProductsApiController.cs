//MSSV:2123110137
//Truong Minh Tri
//CCQ2311D
//Ngay tao:04/06/2026
//Mo ta: API lay danh sach danh muc san pham cho ReactJS

using CMS.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers.Api
{
    [Route("api/CategoriesProducts")]
    [ApiController]
    public class CategoriesProductsApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoriesProductsApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategoriesProducts()
        {
            var data = await _context.CategoriesProducts
                .Select(c => new
                {
                    c.Id,
                    c.Name,
                    c.Description
                })
                .ToListAsync();

            return Ok(data);
        }
    }
}