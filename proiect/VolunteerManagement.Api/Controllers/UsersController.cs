using Microsoft.AspNetCore.Mvc;
using VolunteerManagement.BusinessLayer;
using VolunteerManagement.BusinessLayer.Interfaces;
using VolunteerManagement.Domain.Models.Auth;

namespace VolunteerManagement.API.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserAction _userAction;

        public UsersController()
        {
            var bl = new BusinessLogic();
            _userAction = bl.UserAction();
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = _userAction.GetAllUsers();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _userAction.GetUserById(id);
            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }
            return Ok(user);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, [FromBody] UserDto userData)
        {
            if (id != userData.Id)
            {
                return BadRequest(new { message = "ID mismatch." });
            }

            var result = _userAction.UpdateUser(id, userData);
            
            if (!result.IsSuccess)
            {
                return NotFound(result);
            }
            
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var result = _userAction.DeleteUser(id);
            
            if (!result.IsSuccess)
            {
                return NotFound(result);
            }
            
            return Ok(result);
        }
        
        [HttpPost]
        public IActionResult CreateUser([FromBody] CreateUserDto userData)
        {
            if (string.IsNullOrWhiteSpace(userData.Email) || string.IsNullOrWhiteSpace(userData.Password))
            {
                return BadRequest(new { message = "Email and password are required." });
            }

            var result = _userAction.CreateUser(userData);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
        
        [HttpGet("search")]
        public IActionResult SearchUsers([FromQuery] string term)
        {
            if (string.IsNullOrWhiteSpace(term))
            {
                return Ok(_userAction.GetAllUsers());
            }
            
            var users = _userAction.SearchUsers(term);
            return Ok(users);
        }
    }
}