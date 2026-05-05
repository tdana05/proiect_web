using VolunteerManagement.BusinessLayer.Core;
using VolunteerManagement.BusinessLayer.Interfaces;
using VolunteerManagement.Domain.Models.Event;
using VolunteerManagement.Domain.Models.Responses;

namespace VolunteerManagement.BusinessLayer.Structure
{
    public class EventExecution : EventActions, IEventAction
    {
        public List<EventDto> GetAllEvents(int? month = null, int? year = null)
        {
            return GetAllEventsActionExecution(month, year);
        }

        public EventDto? GetEventById(int id)
        {
            return GetEventByIdActionExecution(id);
        }

        public ActionResponse CreateEvent(CreateEventDto eventData)
        {
            return CreateEventActionExecution(eventData);
        }

        public ActionResponse UpdateEvent(int id, UpdateEventDto eventData)
        {
            return UpdateEventActionExecution(id, eventData);
        }

        public ActionResponse DeleteEvent(int id)
        {
            return DeleteEventActionExecution(id);
        }

        public ActionResponse ToggleAttend(int eventId, int userId)
        {
            return ToggleAttendActionExecution(eventId, userId);
        }
    }
}