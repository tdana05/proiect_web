using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VolunteerManagement.Domain.Entities
{
    public class EventData
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [StringLength(2000)]
        public string Description { get; set; } = string.Empty;

        [Required]
        public DateTime Date { get; set; }

        public DateTime? EndDate { get; set; }

        [Required]
        [StringLength(200)]
        public string Location { get; set; } = string.Empty;

        [Required]
        [StringLength(20)]
        public string Type { get; set; } = "event";

        [Required]
        public int CreatedBy { get; set; }

        [Required]
        [StringLength(20)]
        public string Color { get; set; } = "#0891b2";

        public bool IsDeleted { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public DateTime? UpdatedAt { get; set; }

        // Navigation property
        public virtual ICollection<EventAttendeeData> Attendees { get; set; } = new List<EventAttendeeData>();
    }
}