using Microsoft.AspNetCore.Mvc;
using VolunteerManagement.BusinessLayer;
using VolunteerManagement.BusinessLayer.Interfaces;
using VolunteerManagement.Domain.Models.Auth;
using VolunteerManagement.Domain.Enums;

namespace VolunteerManagement.API.Controllers
{
    [Route("api/volunteers")]
    [ApiController]
    public class VolunteersController : ControllerBase
    {
        private IUserAction _userAction;

        public VolunteersController()
        {
            var bl = new BusinessLogic();
            _userAction = bl.UserAction();
        }

        [HttpPost]
        public IActionResult CreateVolunteer([FromBody] CreateUserDto volunteerData)
        {
            
            volunteerData.Role = UserRole.Volunteer;
            var result = _userAction.CreateUser(volunteerData);
            
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }
            
            return Ok(result);
        }

        [HttpGet]
        public IActionResult GetAllVolunteers()
        {
            var allUsers = _userAction.GetAllUsers();
            var volunteers = allUsers.Where(u => u.Role == UserRole.Volunteer);
            return Ok(volunteers);
        }
    }
}