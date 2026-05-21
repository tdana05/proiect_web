using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VolunteerManagement.BusinessLayer;
using VolunteerManagement.BusinessLayer.Interfaces;
using VolunteerManagement.Domain.Models.HoursEntry;

namespace VolunteerManagement.API.Controllers
{
    [Route("api/hours")]
    [ApiController]
    public class HoursEntriesController : ControllerBase
    {
        private IHoursEntryAction _hoursEntryAction;

        public HoursEntriesController()
        {
            var bl = new BusinessLogic();
            _hoursEntryAction = bl.HoursEntryAction();
        }

        [HttpGet]
        [Authorize(Policy = "AdminOnly")]  // ← schimbă aici
        public IActionResult GetAllHoursEntries()
        {
            var entries = _hoursEntryAction.GetAllHoursEntries();
            return Ok(entries);
        }

        [HttpGet("my-hours")]
        [Authorize(Policy = "VolunteerOnly")]  // ← adaugă această politică
        public IActionResult GetMyHours()
        {
            var userIdClaim = User.FindFirst("userId")?.Value;
            if (string.IsNullOrEmpty(userIdClaim))
            {
                return Unauthorized(new { message = "User ID not found in token." });
            }
            
            var userId = int.Parse(userIdClaim);
            var entries = _hoursEntryAction.GetHoursByVolunteer(userId);
            return Ok(entries);
        }

        [HttpGet("{id}")]
        [Authorize]  // orice utilizator autentificat
        public IActionResult GetHoursEntryById(int id)
        {
            var entry = _hoursEntryAction.GetHoursEntryById(id);
            if (entry == null)
            {
                return NotFound(new { message = "Hours entry not found." });
            }
            return Ok(entry);
        }

        [HttpPost]
        [Authorize(Policy = "VolunteerOnly")]  // doar voluntari
        public IActionResult CreateHoursEntry([FromBody] CreateHoursEntryDto dto)
        {
            if (dto.Hours <= 0 || dto.Hours > 24)
            {
                return BadRequest(new { message = "Hours must be between 1 and 24." });
            }

            var result = _hoursEntryAction.CreateHoursEntry(dto);
            
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            
            return BadRequest(result);
        }

        [HttpPut("{id}/status")]
        [Authorize(Policy = "AdminOnly")]  // doar admin
        public IActionResult UpdateHoursStatus(int id, [FromBody] UpdateHoursStatusDto dto)
        {
            var result = _hoursEntryAction.UpdateHoursStatus(id, dto);
            
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            
            return BadRequest(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "AdminOnly")]  // doar admin
        public IActionResult DeleteHoursEntry(int id)
        {
            var result = _hoursEntryAction.DeleteHoursEntry(id);
            
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            
            return NotFound(result);
        }
    }
}