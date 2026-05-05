namespace VolunteerManagement.Domain.Models.Event
{
    public class EventDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
        public string? EndDate { get; set; }
        public string Location { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string CreatedBy { get; set; } = string.Empty;
        public string CreatedByName { get; set; } = string.Empty;
        public List<string> Attendees { get; set; } = new();
        public List<int> AttendeeIds { get; set; } = new();
        public string Color { get; set; } = string.Empty;
    }
}