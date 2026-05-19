using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VolunteerManagement.Domain.Entities
{
    public class DocumentData
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [StringLength(20)]
        public string Type { get; set; } = "other";

        public int UploadedBy { get; set; } 

        public DateTime UploadedAt { get; set; } = DateTime.Now;

        [StringLength(50)]
        public string Size { get; set; } = string.Empty;

        [Required]
        [StringLength(30)]
        public string Category { get; set; } = "other"; 

        [StringLength(500)]
        public string Url { get; set; } = string.Empty;

        public bool IsDeleted { get; set; } = false;
        public DateTime? UpdatedAt { get; set; }
    }
}