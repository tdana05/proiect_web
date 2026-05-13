using System.ComponentModel.DataAnnotations;

namespace VolunteerManagement.Domain.Models.Tasks
{
    public class CreateTaskDto
    {
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [StringLength(2000)]
        public string Description { get; set; } = string.Empty;

        public string Status { get; set; } = "PLANNED";

        [Required]
        public int AssigneeId { get; set; }

        [Required]
        public int OwnerId { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

        public string Priority { get; set; } = "medium";

        public string Category { get; set; } = string.Empty;
    }
}