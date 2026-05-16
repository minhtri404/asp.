//MSSV:2123110137
//Truong Minh Tri
//CCQ2311D
//Ngay tao:16/5/2026
//Mo ta: File Entity Post dung de luu thong tin bai viet

namespace CMS.Data.Entities
{
    public class Post
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public string ImageUrl { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.Now;

        // Khoa ngoai lien ket den bang Category
        public int CategoryId { get; set; }

        public virtual Category Category { get; set; }
    }
}