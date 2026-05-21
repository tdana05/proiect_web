using VolunteerManagement.Domain.Models.Statistics;

namespace VolunteerManagement.BusinessLayer.Interfaces
{
    public interface IStatisticsAction
    {
        StatisticsDto GetStatistics();
        List<MonthlyHoursDto> GetMonthlyHours();
        List<TaskStatusDto> GetTaskStatus();
        List<TopVolunteerDto> GetTopVolunteers(int top = 5);
    }
}