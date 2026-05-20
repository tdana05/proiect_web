using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VolunteerManagement.Domain.Entities
{
    public class HoursEntryData
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int VolunteerId { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        [Range(0, 24)]
        [Column(TypeName = "decimal(5,2)")]
        public decimal Hours { get; set; }

        [StringLength(500)]
        public string Description { get; set; } = string.Empty;

        public int? RelatedTaskId { get; set; }

        public int? RelatedEventId { get; set; }

        [Required]
        [StringLength(20)]
        public string Status { get; set; } = "pending"; 

        [StringLength(500)]
        public string? AdminNote { get; set; }

        public bool IsDeleted { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public DateTime? UpdatedAt { get; set; }

        [ForeignKey("VolunteerId")]
        public UserData Volunteer { get; set; } = null!;
    }
}