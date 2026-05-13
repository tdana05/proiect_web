using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VolunteerManagement.BusinessLayer;
using VolunteerManagement.BusinessLayer.Interfaces;
using VolunteerManagement.Domain.Models.Hours;

namespace VolunteerManagement.API.Controllers
{
    [Route("api/hours")]
    [ApiController]
    public class HoursEntriesController : ControllerBase
    {
        private IHoursEntryAction _hoursAction;

        public HoursEntriesController()
        {
            var bl = new BusinessLogic();
            _hoursAction = bl.HoursEntryAction();
        }

     
        [HttpGet]
        [Authorize(Roles = "admin")]
        public IActionResult GetAllHoursEntries()
        {
            var entries = _hoursAction.GetAllHoursEntries();
            return Ok(entries);
        }

        
        [HttpGet("volunteer/{volunteerId}")]
        public IActionResult GetHoursEntriesByVolunteer(int volunteerId)
        {
            var entries = _hoursAction.GetHoursEntriesByVolunteer(volunteerId);
            return Ok(entries);
        }

   
        [HttpGet("{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult GetHoursEntryById(int id)
        {
            var entry = _hoursAction.GetHoursEntryById(id);
            if (entry == null)
                return NotFound(new { message = "Hours entry not found." });
            return Ok(entry);
        }

        
        [HttpPost]
        public IActionResult CreateHoursEntry([FromBody] CreateHoursEntryDto data)
        {
            var result = _hoursAction.CreateHoursEntry(data);
            if (!result.IsSuccess)
                return BadRequest(result);
            return Ok(result);
        }

  
        [HttpPut("{id}/status")]
        [Authorize(Roles = "admin")]
        public IActionResult UpdateHoursEntryStatus(int id, [FromBody] UpdateHoursEntryDto data)
        {
            if (id != data.Id)
                return BadRequest(new { message = "ID mismatch." });

            var result = _hoursAction.UpdateHoursEntryStatus(id, data);
            if (!result.IsSuccess)
                return NotFound(result);
            return Ok(result);
        }


        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult DeleteHoursEntry(int id)
        {
            var result = _hoursAction.DeleteHoursEntry(id);
            if (!result.IsSuccess)
                return NotFound(result);
            return Ok(result);
        }
    }
}