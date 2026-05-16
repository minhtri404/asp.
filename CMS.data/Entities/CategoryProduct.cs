//MSSV:2123110137
//Truong Minh Tri
//CCQ2311D
//Ngay tao:16/5/2026
//Mo ta: Thuc the danh muc san pham

using System.ComponentModel.DataAnnotations;

namespace CMS.Data.Entities
{
    public class CategoryProduct
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Tên danh mục không được để trống")]
        [StringLength(100)]
        public string Name { get; set; }

        public string? Description { get; set; }

        // Quan hệ: Một danh mục có nhiều sản phẩm
        public virtual ICollection<Product>? Products { get; set; }
    }
}