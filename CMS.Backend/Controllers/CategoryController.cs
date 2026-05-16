//MSSV:2123110137
//Truong Minh Tri
//CCQ2311D
//Ngay tao:16/5/2026
//Mo ta: Controller hien thi danh sach danh muc du lieu mau

using Microsoft.AspNetCore.Mvc;
using CMS.Data.Entities;

namespace CMS.Backend.Controllers
{
    public class CategoryController : Controller
    {
        public IActionResult Index()
        {
            var list = new List<Category>
            {
                new Category
                {
                    Id = 1,
                    Name = "Tin Cong Nghe",
                    Description = "Review Laptop, AI"
                },

                new Category
                {
                    Id = 2,
                    Name = "Giao Duc",
                    Description = "Thong tin tuyen sinh"
                }
            };

            return View(list);
        }
    }
}