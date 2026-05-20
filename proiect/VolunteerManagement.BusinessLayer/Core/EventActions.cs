using VolunteerManagement.Domain.Entities;
using VolunteerManagement.Domain.Models.Event;
using VolunteerManagement.Domain.Models.Responses;
using VolunteerManagement.DataAccess.Context;

namespace VolunteerManagement.BusinessLayer.Core
{
    public class EventActions
    {
        protected EventActions() { }

        protected List<EventDto> GetAllEventsActionExecution(int? month = null, int? year = null)
        {
            var result = new List<EventDto>();
            using (var db = new EventContext())
            {
                var query = db.Events.Where(x => !x.IsDeleted);

                if (month.HasValue && year.HasValue)
                {
                    query = query.Where(e => e.Date.Month == month.Value && e.Date.Year == year.Value);
                }

                var events = query.OrderBy(e => e.Date).ToList();

                foreach (var ev in events)
                {
                    result.Add(MapToEventDto(ev, db));
                }
            }
            return result;
        }

        protected EventDto? GetEventByIdActionExecution(int id)
        {
            using (var db = new EventContext())
            {
                var ev = db.Events.FirstOrDefault(x => x.Id == id && !x.IsDeleted);
                if (ev == null) return null;
                return MapToEventDto(ev, db);
            }
        }

        protected ActionResponse CreateEventActionExecution(CreateEventDto eventData)
        {
            using (var db = new EventContext())
            {
                var ev = new EventData
                {
                    Title = eventData.Title,
                    Description = eventData.Description,
                    Date = DateTime.Parse(eventData.Date),
                    EndDate = !string.IsNullOrEmpty(eventData.EndDate) ? DateTime.Parse(eventData.EndDate) : null,
                    Location = eventData.Location,
                    Type = eventData.Type,
                    CreatedBy = eventData.CreatedBy,
                    Color = eventData.Color,
                    CreatedAt = DateTime.Now
                };

                db.Events.Add(ev);
                db.SaveChanges();

                foreach (var attendeeId in eventData.AttendeeIds)
                {
                    db.EventAttendees.Add(new EventAttendeeData
                    {
                        EventId = ev.Id,
                        UserId = attendeeId,
                        JoinedAt = DateTime.Now
                    });
                }
                db.SaveChanges();

                return new ActionResponse
                {
                    IsSuccess = true,
                    Message = "Event created successfully.",
                    Data = new { Id = ev.Id }
                };
            }
        }

        protected ActionResponse UpdateEventActionExecution(int id, UpdateEventDto eventData)
        {
            using (var db = new EventContext())
            {
                var ev = db.Events.FirstOrDefault(x => x.Id == id && !x.IsDeleted);
                if (ev == null)
                {
                    return new ActionResponse
                    {
                        IsSuccess = false,
                        Message = "Event not found."
                    };
                }

                ev.Title = eventData.Title;
                ev.Description = eventData.Description;
                ev.Date = DateTime.Parse(eventData.Date);
                ev.EndDate = !string.IsNullOrEmpty(eventData.EndDate) ? DateTime.Parse(eventData.EndDate) : null;
                ev.Location = eventData.Location;
                ev.Type = eventData.Type;
                ev.Color = eventData.Color;
                ev.UpdatedAt = DateTime.Now;

                var oldAttendees = db.EventAttendees.Where(a => a.EventId == id).ToList();
                db.EventAttendees.RemoveRange(oldAttendees);

                foreach (var attendeeId in eventData.AttendeeIds)
                {
                    db.EventAttendees.Add(new EventAttendeeData
                    {
                        EventId = id,
                        UserId = attendeeId,
                        JoinedAt = DateTime.Now
                    });
                }

                db.SaveChanges();

                return new ActionResponse
                {
                    IsSuccess = true,
                    Message = "Event updated successfully."
                };
            }
        }

        protected ActionResponse DeleteEventActionExecution(int id)
        {
            using (var db = new EventContext())
            {
                var ev = db.Events.FirstOrDefault(x => x.Id == id);
                if (ev == null)
                {
                    return new ActionResponse
                    {
                        IsSuccess = false,
                        Message = "Event not found."
                    };
                }

                ev.IsDeleted = true;
                ev.UpdatedAt = DateTime.Now;
                db.SaveChanges();

                return new ActionResponse
                {
                    IsSuccess = true,
                    Message = "Event deleted successfully."
                };
            }
        }

        protected ActionResponse ToggleAttendActionExecution(int eventId, int userId)
        {
            using (var db = new EventContext())
            {
                var ev = db.Events.FirstOrDefault(x => x.Id == eventId && !x.IsDeleted);
                if (ev == null)
                {
                    return new ActionResponse
                    {
                        IsSuccess = false,
                        Message = "Event not found."
                    };
                }

                var attendance = db.EventAttendees.FirstOrDefault(a => a.EventId == eventId && a.UserId == userId);
                
                if (attendance == null)
                {
                    db.EventAttendees.Add(new EventAttendeeData
                    {
                        EventId = eventId,
                        UserId = userId,
                        JoinedAt = DateTime.Now
                    });
                    db.SaveChanges();
                    return new ActionResponse
                    {
                        IsSuccess = true,
                        Message = "Successfully joined the event."
                    };
                }
                else
                {
                    db.EventAttendees.Remove(attendance);
                    db.SaveChanges();
                    return new ActionResponse
                    {
                        IsSuccess = true,
                        Message = "Successfully left the event."
                    };
                }
            }
        }

        private EventDto MapToEventDto(EventData ev, EventContext db)
        {
            var creator = db.Users.FirstOrDefault(u => u.Id == ev.CreatedBy);
    
            var attendeesList = db.EventAttendees
                .Where(a => a.EventId == ev.Id)
                .ToList();
    
            var attendeeIds = attendeesList.Select(a => a.UserId).ToList();
            var attendeeUsers = db.Users.Where(u => attendeeIds.Contains(u.Id)).ToList();

            return new EventDto
            {
                Id = ev.Id,
                Title = ev.Title,
                Description = ev.Description,
                Date = ev.Date.ToString("yyyy-MM-dd"),
                EndDate = ev.EndDate?.ToString("yyyy-MM-dd"),
                Location = ev.Location,
                Type = ev.Type,
                CreatedBy = ev.CreatedBy.ToString(),
                CreatedByName = creator?.Name ?? "Unknown",
                Attendees = attendeeUsers.Select(u => u.Name).ToList(),
                AttendeeIds = attendeeIds,
                Color = ev.Color
            };
        }
    }
}