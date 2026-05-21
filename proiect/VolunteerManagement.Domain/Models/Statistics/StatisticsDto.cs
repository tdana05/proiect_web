namespace VolunteerManagement.Domain.Models.Statistics
{
    public class StatisticsDto
    {
        public int TotalVolunteers { get; set; }
        public int ActiveVolunteers { get; set; }
        public int TotalHours { get; set; }
        public int CompletedTasks { get; set; }
        public int TotalEvents { get; set; }
        public int UpcomingEvents { get; set; }
    }

    public class MonthlyHoursDto
    {
        public string Month { get; set; } = string.Empty;
        public int Hours { get; set; }
    }

    public class TaskStatusDto
    {
        public string Status { get; set; } = string.Empty;
        public int Count { get; set; }
        public string Color { get; set; } = string.Empty;
    }

    public class TopVolunteerDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Hours { get; set; }
        public int Rank { get; set; }
    }
}