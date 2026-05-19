namespace VolunteerManagement.Domain.Models.Tasks
{
    public class UpdateTaskDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public int AssigneeId { get; set; }
        public DateTime DueDate { get; set; }
        public string Priority { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
    }
}