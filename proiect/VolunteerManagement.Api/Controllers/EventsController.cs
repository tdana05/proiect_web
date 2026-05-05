using Microsoft.AspNetCore.Mvc;
using VolunteerManagement.BusinessLayer;
using VolunteerManagement.BusinessLayer.Interfaces;
using VolunteerManagement.Domain.Models.Event;

namespace VolunteerManagement.API.Controllers
{
    [Route("api/events")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private IEventAction _eventAction;

        public EventsController()
        {
            var bl = new BusinessLogic();
            _eventAction = bl.EventAction();
        }

        [HttpGet]
        public IActionResult GetAllEvents([FromQuery] int? month, [FromQuery] int? year)
        {
            var events = _eventAction.GetAllEvents(month, year);
            return Ok(events);
        }

        [HttpGet("{id}")]
        public IActionResult GetEventById(int id)
        {
            var ev = _eventAction.GetEventById(id);
            if (ev == null)
            {
                return NotFound(new { message = "Event not found." });
            }
            return Ok(ev);
        }

        [HttpPost]
        public IActionResult CreateEvent([FromBody] CreateEventDto eventData)
        {
            if (string.IsNullOrWhiteSpace(eventData.Title) || string.IsNullOrWhiteSpace(eventData.Date))
            {
                return BadRequest(new { message = "Title and Date are required." });
            }

            var result = _eventAction.CreateEvent(eventData);
            
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            
            return BadRequest(result);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateEvent(int id, [FromBody] UpdateEventDto eventData)
        {
            var result = _eventAction.UpdateEvent(id, eventData);
            
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            
            return NotFound(result);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEvent(int id)
        {
            var result = _eventAction.DeleteEvent(id);
            
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            
            return NotFound(result);
        }

        [HttpPost("{id}/attend")]
        public IActionResult ToggleAttend(int id, [FromBody] int userId)
        {
            var result = _eventAction.ToggleAttend(id, userId);
            
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            
            return BadRequest(result);
        }
    }
}