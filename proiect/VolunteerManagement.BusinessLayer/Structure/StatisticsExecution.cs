using VolunteerManagement.BusinessLayer.Core;
using VolunteerManagement.BusinessLayer.Interfaces;
using VolunteerManagement.Domain.Models.Statistics;

namespace VolunteerManagement.BusinessLayer.Structure
{
    public class StatisticsExecution : StatisticsActions, IStatisticsAction
    {
        public StatisticsDto GetStatistics() => GetStatisticsActionExecution();
        public List<MonthlyHoursDto> GetMonthlyHours() => GetMonthlyHoursActionExecution();
        public List<TaskStatusDto> GetTaskStatus() => GetTaskStatusActionExecution();
        public List<TopVolunteerDto> GetTopVolunteers(int top = 5) => GetTopVolunteersActionExecution(top);
    }
}