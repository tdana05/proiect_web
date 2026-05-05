namespace VolunteerManagement.Domain.Models.Auth
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string? Phone { get; set; }
        public string JoinDate { get; set; } = string.Empty;
        public string? Department { get; set; }
        public string? Bio { get; set; }
        public int TotalHours { get; set; }
        public int TasksCompleted { get; set; }
        public int EventsAttended { get; set; }
    }
}