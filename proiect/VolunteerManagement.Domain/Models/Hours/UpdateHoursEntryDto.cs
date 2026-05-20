namespace VolunteerManagement.Domain.Models.Hours
{
    public class UpdateHoursEntryDto
    {
        public int Id { get; set; }
        public string Status { get; set; } = string.Empty;
        public string? AdminNote { get; set; }
    }
}