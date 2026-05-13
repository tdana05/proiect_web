using System.ComponentModel.DataAnnotations;

namespace VolunteerManagement.Domain.Models.Hours
{
    public class CreateHoursEntryDto
    {
        [Required]
        public int VolunteerId { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        [Range(0.5, 24)]
        public decimal Hours { get; set; }

        [MaxLength(500)]
        public string Description { get; set; } = string.Empty;

        public int? RelatedTaskId { get; set; }

        public int? RelatedEventId { get; set; }
    }
}