//MSSV:2123110137
//Truong Minh Tri
//CCQ2311D
//Ngay tao:16/5/2026
//Mo ta: Controller hien thi danh sach thanh vien quan tri he thong

using Microsoft.AspNetCore.Mvc;
using CMS.Data.Entities; // Phai co dong nay de dung lop User

namespace CMS.Backend.Controllers
{
    public class UserController : Controller
    {
        // Ham Index: Hien thi danh sach thanh vien quan tri
        public IActionResult Index()
        {
            // 1. Tao danh sach Nguoi dung gia lap
            var users = new List<User>
            {
                new User
                {
                    Id = 1,
                    Username = "admin_thai",
                    FullName = "Nguyen Cao Thai",
                    Role = "Administrator"
                },

                new User
                {
                    Id = 2,
                    Username = "editor_01",
                    FullName = "Tran Van Bien Tap",
                    Role = "Editor"
                },

                new User
                {
                    Id = 3,
                    Username = "author_minh",
                    FullName = "Le Quang Minh",
                    Role = "Author"
                }
            };

            // 2. Tra ve View kem theo danh sach nguoi dung
            return View(users);
        }
    }
}