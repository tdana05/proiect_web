namespace VolunteerManagement.Domain.Models.HoursEntry
{
    public class HoursEntryDto
    {
        public int Id { get; set; }
        public int VolunteerId { get; set; }
        public string VolunteerName { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public decimal Hours { get; set; }
        public string Description { get; set; } = string.Empty;
        public int? RelatedTaskId { get; set; }
        public int? RelatedEventId { get; set; }
        public string Status { get; set; } = "pending";
        public string? AdminNote { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CreateHoursEntryDto
    {
        public int VolunteerId { get; set; }
        public DateTime Date { get; set; }
        public decimal Hours { get; set; }
        public string Description { get; set; } = string.Empty;
        public int? RelatedTaskId { get; set; }
        public int? RelatedEventId { get; set; }
    }

    public class UpdateHoursStatusDto
    {
        public string Status { get; set; } = "pending";
        public string? AdminNote { get; set; }
    }
}