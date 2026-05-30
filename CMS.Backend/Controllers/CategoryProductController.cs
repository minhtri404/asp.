//MSSV:2123110137
//Truong Minh Tri
//CCQ2311D
//Ngay tao:16/5/2026
//Mo ta: Controller hien thi danh sach danh muc san pham tu SQL Server

using Microsoft.AspNetCore.Mvc;
using CMS.Data;
using Microsoft.AspNetCore.Authorization;
using CMS.Data.Entities;
namespace CMS.Backend.Controllers
{
    [Authorize(Roles = "Admin,Editor")]
    public class CategoryProductController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CategoryProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var data = _context.CategoriesProducts.ToList();
            return View(data);
        }
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(CategoryProduct model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            _context.CategoriesProducts.Add(model);
            _context.SaveChanges();

            TempData["SuccessMessage"] = "Thêm thành công";
            return RedirectToAction("Index");
        }
        [HttpPost]
        public IActionResult Edit(Category model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            _context.Categories.Update(model);
            _context.SaveChanges();

            TempData["SuccessMessage"] = "Sửa thành công";
            return RedirectToAction("Index");
        }
    }
}