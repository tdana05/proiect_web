namespace VolunteerManagement.Domain.Models.Dashboard
{
    public class RecentEventDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
    }
}