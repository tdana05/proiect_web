namespace VolunteerManagement.Domain.Models.Dashboard
{
    public class RecentAnnouncementDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string CreatedAt { get; set; } = string.Empty;
        public string Priority { get; set; } = string.Empty;
        public bool Pinned { get; set; }
    }
}