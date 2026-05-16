//MSSV:2123110137
//Truong Minh Tri
//CCQ2311D
//Ngay tao:16/5/2026
//Mo ta: Controller quan ly bai viet va hien thi du lieu mau

using Microsoft.AspNetCore.Mvc;
using CMS.Data.Entities;

namespace CMS.Backend.Controllers
{
    public class PostController : Controller
    {
        // Ham Index: Hien thi danh sach bai viet mau
        public IActionResult Index()
        {
            // 1. Tao du lieu gia lap cho bai viet
            var posts = new List<Post>
            {
                new Post
                {
                    Id = 1,
                    Title = "Lo trinh hoc ASP.NET Core cho nguoi moi",
                    Content = "Noi dung bai viet ve lo trinh hoc .NET...",
                    ImageUrl = "https://via.placeholder.com/150",
                    CreatedDate = DateTime.Now
                },

                new Post
                {
                    Id = 2,
                    Title = "ReactJS va WebAPI: Xu huong Fullstack 2026",
                    Content = "Noi dung bai viet ve su ket hop React va API...",
                    ImageUrl = "https://via.placeholder.com/150",
                    CreatedDate = DateTime.Now.AddDays(-1)
                },

                new Post
                {
                    Id = 3,
                    Title = "Huong dan cai dat moi truong Visual Studio",
                    Content = "Cac buoc cai dat cong cu can thiet cho lap trinh vien...",
                    ImageUrl = "https://via.placeholder.com/150",
                    CreatedDate = DateTime.Now.AddDays(-2)
                }
            };

            // 2. Gui danh sach du lieu sang View
            return View(posts);
        }

        // Ham Details: Hien thi chi tiet mot bai viet
        public IActionResult Details(int id)
        {
            var post = new Post
            {
                Id = id,
                Title = "Noi dung chi tiet bai viet so " + id,
                Content = "Day la noi dung day du cua bai viet ma ban vua click vao. O day co the viet dai hon de thay su khac biet voi trang danh sach.",
                ImageUrl = "https://via.placeholder.com/600x300",
                CreatedDate = DateTime.Now
            };

            return View(post);
        }
    }
}