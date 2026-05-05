/*
using Microsoft.AspNetCore.Mvc;
using VolunteerManagement.BusinessLayer;
using VolunteerManagement.BusinessLayer.Interfaces;

namespace VolunteerManagement.API.Controllers
{
    [Route("api/dashboard")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private IDashboardAction _dashboardAction;
        private IUserAction _userAction;

        public DashboardController()
        {
            var bl = new BusinessLogic();
            _dashboardAction = bl.DashboardAction();
            _userAction = bl.UserAction();
        }

        [HttpGet("stats")]
        public IActionResult GetStats([FromQuery] int? userId, [FromQuery] bool isAdmin = false)
        {
            if (userId.HasValue && !isAdmin)
            {
                var user = _userAction.GetUserById(userId.Value);
                if (user == null)
                {
                    return NotFound(new { message = "User not found." });
                }
                var stats = _dashboardAction.GetVolunteerStats(userId.Value);
                return Ok(stats);
            }
            else if (isAdmin)
            {
                var stats = _dashboardAction.GetAdminStats();
                return Ok(stats);
            }

            return BadRequest(new { message = "Invalid parameters." });
        }

        [HttpGet("recent-tasks")]
        public IActionResult GetRecentTasks([FromQuery] int userId, [FromQuery] bool isAdmin = false)
        {
            var tasks = _dashboardAction.GetRecentTasks(userId, isAdmin);
            return Ok(tasks);
        }

        [HttpGet("recent-events")]
        public IActionResult GetRecentEvents()
        {
            var events = _dashboardAction.GetRecentEvents();
            return Ok(events);
        }

        [HttpGet("recent-announcements")]
        public IActionResult GetRecentAnnouncements()
        {
            var announcements = _dashboardAction.GetRecentAnnouncements();
            return Ok(announcements);
        }
    }
}
*/