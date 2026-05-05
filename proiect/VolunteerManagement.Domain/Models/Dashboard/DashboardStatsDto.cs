namespace VolunteerManagement.Domain.Models.Dashboard
{
    public class DashboardStatsDto
    {
        // Pentru Admin
        public int TotalVolunteers { get; set; }
        public int TotalApprovedHours { get; set; }
        public int TotalActiveTasks { get; set; }
        public int TotalUpcomingEvents { get; set; }
        
        // Pentru Volunteer
        public int MyHours { get; set; }
        public int MyActiveTasks { get; set; }
        public int MyUpcomingEvents { get; set; }
        public int MyCompletedTasks { get; set; }
        
        // Common
        public int PendingHours { get; set; }
        public object TasksByStatus { get; set; } = null!;
        public List<HoursByMonthDto> HoursByMonth { get; set; } = new();
        public List<VolunteerActivityDto> VolunteerActivity { get; set; } = new();
    }

    public class HoursByMonthDto
    {
        public string Month { get; set; } = string.Empty;
        public int Hours { get; set; }
    }

    public class VolunteerActivityDto
    {
        public string Name { get; set; } = string.Empty;
        public int Hours { get; set; }
        public int Tasks { get; set; }
    }
}