using Microsoft.AspNetCore.Mvc;
using VolunteerManagement.BusinessLayer;
using VolunteerManagement.BusinessLayer.Interfaces;
using VolunteerManagement.Domain.Models;
using VolunteerManagement.Domain.Models.Responses;

namespace VolunteerManagement.API.Controllers
{
    [Route("api/announcements")]
    [ApiController]
    public class AnnouncementsController : ControllerBase
    {
        private IAnnouncementAction _announcementAction;

        public AnnouncementsController()
        {
            var bl = new BusinessLogic();
            _announcementAction = bl.AnnouncementAction();
        }

        [HttpGet]
        public IActionResult GetAllAnnouncements()
        {
            var announcements = _announcementAction.GetAllAnnouncementsAction();
            return Ok(announcements);
        }

        [HttpGet("{id}")]
        public IActionResult GetAnnouncementById(int id)
        {
            var announcement = _announcementAction.GetAnnouncementByIdAction(id);
            if (announcement == null)
            {
                return NotFound(new { message = "Announcement not found." });
            }
            return Ok(announcement);
        }

        [HttpPost]
        public IActionResult CreateAnnouncement([FromBody] AnnouncementDto announcement)
        {
            if (string.IsNullOrWhiteSpace(announcement.Title) || string.IsNullOrWhiteSpace(announcement.Content))
            {
                return BadRequest(new { message = "Title and Content are required." });
            }

            var result = _announcementAction.CreateAnnouncementAction(announcement);
            
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            
            return BadRequest(result);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateAnnouncement(int id, [FromBody] AnnouncementDto announcement)
        {
            if (id != announcement.Id)
            {
                return BadRequest(new { message = "ID mismatch." });
            }

            var result = _announcementAction.UpdateAnnouncementAction(announcement);
            
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            
            return NotFound(result);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteAnnouncement(int id)
        {
            var result = _announcementAction.DeleteAnnouncementAction(id);
            
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            
            return NotFound(result);
        }
    }
}