namespace VolunteerManagement.Domain.Models.Hours
{
    public class HoursEntryDto
    {
        public int Id { get; set; }
        public int VolunteerId { get; set; }
        public string VolunteerName { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
        public decimal Hours { get; set; }
        public string Description { get; set; } = string.Empty;
        public int? RelatedTaskId { get; set; }
        public string? RelatedTaskTitle { get; set; }
        public int? RelatedEventId { get; set; }
        public string Status { get; set; } = string.Empty;
        public string? AdminNote { get; set; }
    }
}