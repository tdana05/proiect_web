namespace VolunteerManagement.Domain.Models.Dashboard
{
    public class RecentTaskDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string DueDate { get; set; } = string.Empty;
        public string AssigneeName { get; set; } = string.Empty;
    }
}