using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VolunteerManagement.BusinessLayer;
using VolunteerManagement.BusinessLayer.Interfaces;

namespace VolunteerManagement.API.Controllers
{
    [Route("api/statistics")]
    [ApiController]
    [Authorize]
    public class StatisticsController : ControllerBase
    {
        private IStatisticsAction _statisticsAction;

        public StatisticsController()
        {
            var bl = new BusinessLogic();
            _statisticsAction = bl.StatisticsAction();
        }

        [HttpGet]
        public IActionResult GetStatistics()
        {
            var stats = _statisticsAction.GetStatistics();
            return Ok(stats);
        }

        [HttpGet("monthly-hours")]
        public IActionResult GetMonthlyHours()
        {
            var data = _statisticsAction.GetMonthlyHours();
            return Ok(data);
        }

        [HttpGet("task-status")]
        public IActionResult GetTaskStatus()
        {
            var data = _statisticsAction.GetTaskStatus();
            return Ok(data);
        }

        [HttpGet("top-volunteers")]
        public IActionResult GetTopVolunteers([FromQuery] int top = 5)
        {
            var data = _statisticsAction.GetTopVolunteers(top);
            return Ok(data);
        }
    }
}