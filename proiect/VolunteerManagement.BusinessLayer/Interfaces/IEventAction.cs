using VolunteerManagement.Domain.Models.Event;
using VolunteerManagement.Domain.Models.Responses;

namespace VolunteerManagement.BusinessLayer.Interfaces
{
    public interface IEventAction
    {
        List<EventDto> GetAllEvents(int? month = null, int? year = null);
        EventDto? GetEventById(int id);
        ActionResponse CreateEvent(CreateEventDto eventData);
        ActionResponse UpdateEvent(int id, UpdateEventDto eventData);
        ActionResponse DeleteEvent(int id);
        ActionResponse ToggleAttend(int eventId, int userId);
    }
}