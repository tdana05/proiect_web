namespace VolunteerManagement.Domain.Models
{
    public class AnnouncementDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string CreatedBy { get; set; } = string.Empty;
        public string CreatedAt { get; set; } = string.Empty;
        public string Priority { get; set; } = "low";
        public bool Pinned { get; set; }
    }
}