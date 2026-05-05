using System.ComponentModel.DataAnnotations;

namespace VolunteerManagement.Domain.Models.Event
{
    public class CreateEventDto
    {
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [StringLength(2000)]
        public string Description { get; set; } = string.Empty;

        [Required]
        public string Date { get; set; } = string.Empty;

        public string? EndDate { get; set; }

        [Required]
        [StringLength(200)]
        public string Location { get; set; } = string.Empty;

        [Required]
        public string Type { get; set; } = "event";

        [Required]
        public int CreatedBy { get; set; }

        [Required]
        public string Color { get; set; } = "#0891b2";

        public List<int> AttendeeIds { get; set; } = new();
    }
}