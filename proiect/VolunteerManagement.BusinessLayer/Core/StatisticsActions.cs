using VolunteerManagement.Domain.Models.Statistics;
using VolunteerManagement.DataAccess.Context;
using VolunteerManagement.Domain.Enums;

namespace VolunteerManagement.BusinessLayer.Core
{
    public class StatisticsActions
    {
        protected StatisticsActions() { }

        protected StatisticsDto GetStatisticsActionExecution()
        {
            using (var userDb = new UserContext())
            using (var hourDb = new HoursEntryContext())
            using (var taskDb = new TaskContext())
            using (var eventDb = new EventContext())
            {
                var volunteers = userDb.Users.Count(x => x.Role == UserRole.Volunteer && !x.IsDeleted);
                var activeVolunteers = userDb.Users.Count(x => x.Role == UserRole.Volunteer && x.Status == "active" && !x.IsDeleted);
                
                var totalHours = hourDb.HoursEntries?
                    .Where(h => h.Status == "approved")
                    .Sum(h => (int)h.Hours) ?? 0;
                
                var completedTasks = taskDb.Tasks?
                    .Count(t => t.Status == "DONE" && !t.IsDeleted) ?? 0;
                
                var totalEvents = eventDb.Events?
                    .Count(e => !e.IsDeleted) ?? 0;
                
                var upcomingEvents = eventDb.Events?
                    .Count(e => e.Date > DateTime.Now && !e.IsDeleted) ?? 0;

                return new StatisticsDto
                {
                    TotalVolunteers = volunteers,
                    ActiveVolunteers = activeVolunteers,
                    TotalHours = totalHours,
                    CompletedTasks = completedTasks,
                    TotalEvents = totalEvents,
                    UpcomingEvents = upcomingEvents
                };
            }
        }

        protected List<MonthlyHoursDto> GetMonthlyHoursActionExecution()
        {
            using (var hourDb = new HoursEntryContext())
            {
                var result = new List<MonthlyHoursDto>();
                var monthNames = new[] { "Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Noi", "Dec" };
                var currentYear = DateTime.Now.Year;
                
                for (int i = 1; i <= 12; i++)
                {
                    var hours = hourDb.HoursEntries?
                        .Where(h => h.Date.Year == currentYear && 
                                   h.Date.Month == i && 
                                   h.Status == "approved")
                        .Sum(h => (int)h.Hours) ?? 0;
                    
                    result.Add(new MonthlyHoursDto
                    {
                        Month = monthNames[i - 1],
                        Hours = hours
                    });
                }
                
                return result;
            }
        }

        protected List<TaskStatusDto> GetTaskStatusActionExecution()
        {
            using (var taskDb = new TaskContext())
            {
                var statusConfig = new[]
                {
                    new { Status = "PLANNED", Label = "Planificat", Color = "bg-slate-400" },
                    new { Status = "IN_PROGRESS", Label = "In progres", Color = "bg-blue-500" },
                    new { Status = "BLOCKED", Label = "Blocat", Color = "bg-red-500" },
                    new { Status = "REVIEW", Label = "Review", Color = "bg-amber-500" },
                    new { Status = "DONE", Label = "Finalizat", Color = "bg-green-500" }
                };

                var result = new List<TaskStatusDto>();
                
                foreach (var config in statusConfig)
                {
                    var count = taskDb.Tasks?
                        .Count(t => t.Status == config.Status && !t.IsDeleted) ?? 0;
                    
                    result.Add(new TaskStatusDto
                    {
                        Status = config.Label,
                        Count = count,
                        Color = config.Color
                    });
                }
                
                return result;
            }
        }

        protected List<TopVolunteerDto> GetTopVolunteersActionExecution(int top = 5)
        {
            using (var userDb = new UserContext())
            using (var hourDb = new HoursEntryContext())
            {
                var volunteers = userDb.Users
                    .Where(x => x.Role == UserRole.Volunteer && !x.IsDeleted)
                    .ToList();
                
                var topVolunteers = volunteers
                    .Select(v => new
                    {
                        v.Id,
                        v.Name,
                        Hours = hourDb.HoursEntries?
                            .Where(h => h.VolunteerId == v.Id && h.Status == "approved")
                            .Sum(h => (int)h.Hours) ?? 0
                    })
                    .OrderByDescending(x => x.Hours)
                    .Take(top)
                    .ToList();
                
                var result = new List<TopVolunteerDto>();
                var rank = 1;
                
                foreach (var v in topVolunteers)
                {
                    result.Add(new TopVolunteerDto
                    {
                        Id = v.Id,
                        Name = v.Name,
                        Hours = v.Hours,
                        Rank = rank++
                    });
                }
                
                return result;
            }
        }
    }
}