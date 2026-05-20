using VolunteerManagement.Domain.Entities;
using VolunteerManagement.Domain.Models.Dashboard;
using VolunteerManagement.DataAccess.Context;
using VolunteerManagement.Domain.Enums;

namespace VolunteerManagement.BusinessLayer.Core
{
    public class DashboardActions
    {
        protected DashboardActions() { }

        protected DashboardStatsDto GetAdminStatsActionExecution()
        {
            using (var userDb = new UserContext())
            using (var taskDb = new TaskContext())
            using (var hourDb = new HoursEntryContext())
            using (var eventDb = new EventContext())
            using (var announcementDb = new AnnouncementContext())
            {
                var volunteers = userDb.Users.Count(x => x.Role == UserRole.Volunteer && !x.IsDeleted);
                
                var approvedHours = hourDb.HoursEntries?
                    .Where(h => h.Status == "approved")
                    .Sum(h => h.Hours) ?? 0;
                
                var activeTasks = taskDb.Tasks?
                    .Count(t => t.Status != "DONE" && !t.IsDeleted) ?? 0;
                
                var upcomingEvents = eventDb.Events?
                    .Count(e => e.Date > DateTime.Now && !e.IsDeleted) ?? 0;
                
                var pendingHours = hourDb.HoursEntries?
                    .Count(h => h.Status == "pending") ?? 0;

                var tasksByStatus = new
                {
                    PLANNED = taskDb.Tasks?.Count(t => t.Status == "PLANNED" && !t.IsDeleted) ?? 0,
                    IN_PROGRESS = taskDb.Tasks?.Count(t => t.Status == "IN_PROGRESS" && !t.IsDeleted) ?? 0,
                    BLOCKED = taskDb.Tasks?.Count(t => t.Status == "BLOCKED" && !t.IsDeleted) ?? 0,
                    REVIEW = taskDb.Tasks?.Count(t => t.Status == "REVIEW" && !t.IsDeleted) ?? 0,
                    DONE = taskDb.Tasks?.Count(t => t.Status == "DONE" && !t.IsDeleted) ?? 0
                };

                var hoursByMonth = new List<HoursByMonthDto>();
                var volunteerActivity = new List<VolunteerActivityDto>();

                return new DashboardStatsDto
                {
                    TotalVolunteers = volunteers,
                    TotalApprovedHours = (int)approvedHours,
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
            using (var taskDb = new TaskContext())
            using (var hourDb = new HoursEntryContext())
            using (var eventDb = new EventContext())
            {
                var myHours = hourDb.HoursEntries?
                    .Where(h => h.VolunteerId == userId && h.Status == "approved")
                    .Sum(h => h.Hours) ?? 0;
                
                var myActiveTasks = taskDb.Tasks?
                    .Count(t => t.AssigneeId == userId && t.Status != "DONE" && !t.IsDeleted) ?? 0;
                
                var myCompletedTasks = taskDb.Tasks?
                    .Count(t => t.AssigneeId == userId && t.Status == "DONE" && !t.IsDeleted) ?? 0;
                
                var pendingHours = hourDb.HoursEntries?
                    .Count(h => h.VolunteerId == userId && h.Status == "pending") ?? 0;

                var myUpcomingEvents = 0;
                var eventAttendees = eventDb.EventAttendees?
                    .Where(a => a.UserId == userId)
                    .Select(a => a.EventId)
                    .ToList() ?? new List<int>();
                
                myUpcomingEvents = eventDb.Events?
                    .Count(e => eventAttendees.Contains(e.Id) && e.Date > DateTime.Now && !e.IsDeleted) ?? 0;

                return new DashboardStatsDto
                {
                    MyHours = (int)myHours,
                    MyActiveTasks = myActiveTasks,
                    MyCompletedTasks = myCompletedTasks,
                    MyUpcomingEvents = myUpcomingEvents,
                    PendingHours = pendingHours
                };
            }
        }

        protected List<RecentTaskDto> GetRecentTasksActionExecution(int userId, bool isAdmin)
        {
            using (var db = new TaskContext())
            using (var userDb = new UserContext())
            {
                var query = db.Tasks?.Where(t => !t.IsDeleted && t.Status != "DONE") ?? new List<TaskData>().AsQueryable();
                
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
                    var assignee = userDb.Users.FirstOrDefault(u => u.Id == task.AssigneeId);
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
            using (var db = new EventContext())
            {
                var events = db.Events?.Where(e => e.Date > DateTime.Now && !e.IsDeleted)
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
            using (var db = new AnnouncementContext())
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