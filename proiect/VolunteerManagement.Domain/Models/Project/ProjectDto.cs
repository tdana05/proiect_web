namespace VolunteerManagement.Domain.Models.Project
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Status { get; set; } = "planning";
        public List<string> VolunteerIds { get; set; } = new();
        public int LeadId { get; set; }
        public List<string>? MemberIds { get; set; } = new();
        public int? Progress { get; set; }
    }
}