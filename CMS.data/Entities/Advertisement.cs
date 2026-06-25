using System.ComponentModel.DataAnnotations;

namespace CMS.Data.Entities
{
    public class Advertisement
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Tiêu đề banner không được để trống")]
        [MaxLength(160)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(120)]
        public string? Subtitle { get; set; }

        [MaxLength(500)]
        public string? Description { get; set; }

        public string? ImageUrl { get; set; }

        [MaxLength(300)]
        public string? LinkUrl { get; set; }

        [MaxLength(80)]
        public string? ButtonText { get; set; }

        public int DisplayOrder { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}
