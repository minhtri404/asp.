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

        [Required(ErrorMessage = "Tên danh mục sản phẩm không được để trống")]
        [StringLength(100, ErrorMessage = "Tên danh mục sản phẩm không được vượt quá 100 ký tự")]
        public string Name { get; set; }

        [StringLength(255, ErrorMessage = "Mô tả không được vượt quá 255 ký tự")]
        public string? Description { get; set; }

        // Quan hệ: Một danh mục sản phẩm có nhiều sản phẩm
        public virtual ICollection<Product>? Products { get; set; }
    }
}
