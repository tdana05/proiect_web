/*
using VolunteerManagement.Domain.Entities;
using VolunteerManagement.Domain.Models.Dashboard;
using VolunteerManagement.DataAccess.Context;

namespace VolunteerManagement.BusinessLayer.Core
{
    public class DashboardActions
    {
        protected DashboardActions() { }

        protected DashboardStatsDto GetAdminStatsActionExecution()
        {
            using (var db = new VolunteerManagementContext())
            {
                var volunteers = db.Users.Count(x => x.Role == "volunteer" && !x.IsDeleted);
                var approvedHours = db.HoursEntries?.Where(h => h.Status == "approved").Sum(h => h.Hours) ?? 0;
                var activeTasks = db.Tasks?.Count(t => t.Status != "DONE") ?? 0;
                var upcomingEvents = db.Events?.Count(e => e.Date > DateTime.Now) ?? 0;
                var pendingHours = db.HoursEntries?.Count(h => h.Status == "pending") ?? 0;

                var tasksByStatus = new
                {
                    PLANNED = db.Tasks?.Count(t => t.Status == "PLANNED") ?? 0,
                    IN_PROGRESS = db.Tasks?.Count(t => t.Status == "IN_PROGRESS") ?? 0,
                    BLOCKED = db.Tasks?.Count(t => t.Status == "BLOCKED") ?? 0,
                    REVIEW = db.Tasks?.Count(t => t.Status == "REVIEW") ?? 0,
                    DONE = db.Tasks?.Count(t => t.Status == "DONE") ?? 0
                };

                var hoursByMonth = new List<HoursByMonthDto>();
                var volunteerActivity = new List<VolunteerActivityDto>();

                return new DashboardStatsDto
                {
                    TotalVolunteers = volunteers,
                    TotalApprovedHours = approvedHours,
                    TotalActiveTasks = activeTasks,
                    TotalUpcomingEvents = upcomingEvents,
                    PendingHours = pendingHours,
                    TasksByStatus = tasksByStatus,
                    HoursByMonth = hoursByMonth,
                    VolunteerActivity = volunteerActivity
                };
            }
        }

        protected DashboardStatsDto GetVolunteerStatsActionExecution(int userId)
        {
            using (var db = new VolunteerManagementContext())
            {
                var myHours = db.HoursEntries?.Where(h => h.VolunteerId == userId && h.Status == "approved").Sum(h => h.Hours) ?? 0;
                var myActiveTasks = db.Tasks?.Count(t => t.AssigneeId == userId && t.Status != "DONE") ?? 0;
                var myCompletedTasks = db.Tasks?.Count(t => t.AssigneeId == userId && t.Status == "DONE") ?? 0;
                
                var myUpcomingEvents = 0;
                if (db.Events != null)
                {
                    myUpcomingEvents = db.Events.Count(e => e.Date > DateTime.Now && e.Attendees.Contains(userId.ToString()));
                }
                
                var pendingHours = db.HoursEntries?.Count(h => h.VolunteerId == userId && h.Status == "pending") ?? 0;

                return new DashboardStatsDto
                {
                    MyHours = myHours,
                    MyActiveTasks = myActiveTasks,
                    MyCompletedTasks = myCompletedTasks,
                    MyUpcomingEvents = myUpcomingEvents,
                    PendingHours = pendingHours
                };
            }
        }

        protected List<RecentTaskDto> GetRecentTasksActionExecution(int userId, bool isAdmin)
        {
            using (var db = new VolunteerManagementContext())
            {
                var query = db.Tasks?.Where(t => t.Status != "DONE") ?? new List<TaskData>().AsQueryable();
                
                if (!isAdmin)
                {
                    query = query.Where(t => t.AssigneeId == userId);
                }
                
                var tasks = query.OrderByDescending(t => t.CreatedAt)
                                 .Take(5)
                                 .ToList();

                var result = new List<RecentTaskDto>();
                foreach (var task in tasks)
                {
                    var assignee = db.Users.FirstOrDefault(u => u.Id == task.AssigneeId);
                    result.Add(new RecentTaskDto
                    {
                        Id = task.Id,
                        Title = task.Title,
                        Status = task.Status,
                        DueDate = task.DueDate.ToString("o"),
                        AssigneeName = assignee?.Name ?? "Unknown"
                    });
                }
                return result;
            }
        }

        protected List<RecentEventDto> GetRecentEventsActionExecution()
        {
            using (var db = new VolunteerManagementContext())
            {
                var events = db.Events?.Where(e => e.Date > DateTime.Now)
                                       .OrderBy(e => e.Date)
                                       .Take(3)
                                       .ToList() ?? new List<EventData>();

                var result = new List<RecentEventDto>();
                foreach (var ev in events)
                {
                    result.Add(new RecentEventDto
                    {
                        Id = ev.Id,
                        Title = ev.Title,
                        Date = ev.Date.ToString("o"),
                        Location = ev.Location,
                        Color = ev.Color
                    });
                }
                return result;
            }
        }

        protected List<RecentAnnouncementDto> GetRecentAnnouncementsActionExecution()
        {
            using (var db = new VolunteerManagementContext())
            {
                var announcements = db.Announcements?.Where(a => !a.IsDeleted)
                                                     .OrderByDescending(a => a.Pinned)
                                                     .ThenByDescending(a => a.CreatedAt)
                                                     .Take(3)
                                                     .ToList() ?? new List<AnnouncementData>();

                var result = new List<RecentAnnouncementDto>();
                foreach (var ann in announcements)
                {
                    result.Add(new RecentAnnouncementDto
                    {
                        Id = ann.Id,
                        Title = ann.Title,
                        Content = ann.Content,
                        CreatedAt = ann.CreatedAt.ToString("o"),
                        Priority = ann.Priority,
                        Pinned = ann.Pinned
                    });
                }
                return result;
            }
        }
    }
}
*/