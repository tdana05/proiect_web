using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VolunteerManagement.Domain.Entities
{
    public class EventAttendeeData
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int EventId { get; set; }

        [Required]
        public int UserId { get; set; }

        public DateTime JoinedAt { get; set; } = DateTime.Now;

        [ForeignKey("EventId")]
        public virtual EventData Event { get; set; } = null!;

        [ForeignKey("UserId")]
        public virtual UserData User { get; set; } = null!;
    }
}