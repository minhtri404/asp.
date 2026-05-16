//MSSV:2123110137
//Truong Minh Tri
//CCQ2311D
//Ngay tao:16/5/2026
//Mo ta: File Entity Category dung de luu thong tin danh muc bai viet

namespace CMS.Data.Entities
{
    public class Category
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        // Mot danh muc co nhieu bai viet
        public virtual ICollection<Post> Posts { get; set; }
    }
}   