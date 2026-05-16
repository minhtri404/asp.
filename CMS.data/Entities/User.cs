//MSSV:2123110137
//Truong Minh Tri
//CCQ2311D
//Ngay tao:16/5/2026
//Mo ta: File Entity User dung de luu thong tin nguoi dung quan tri

namespace CMS.Data.Entities
{
    public class User
    {
        public int Id { get; set; }

        public string Username { get; set; }

        public string PasswordHash { get; set; }

        public string FullName { get; set; }

        public string Role { get; set; }
    }
}