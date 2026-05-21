using Microsoft.AspNetCore.Authorization;
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
        [Authorize(Policy = "AdminOnly")]
        public IActionResult GetAllUsers()
        {
            var users = _userAction.GetAllUsers();
            return Ok(users);
        }

        [HttpGet("{id}")]
        [Authorize]
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
        [Authorize]
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
        
        [HttpPost]
        [Authorize(Policy = "AdminOnly")]
        public IActionResult CreateUser([FromBody] CreateUserDto userData)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();
        
                return BadRequest(new { message = "Validation failed", errors = errors });
            }
    
            var result = _userAction.CreateUser(userData);
    
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }
    
            return Ok(result);
        }
        
        [HttpDelete("{id}")]
        [Authorize(Policy = "AdminOnly")]
        public IActionResult DeleteUser(int id)
        {
            var result = _userAction.DeleteUser(id);
            
            if (!result.IsSuccess)
            {
                return NotFound(result);
            }
            
            return Ok(result);
        }

        [HttpPut("{id}/change-password")]
        [Authorize]
        public IActionResult ChangePassword(int id, [FromBody] ChangePasswordDto passwordData)
        {
            if (id != passwordData.UserId)
            {
                return BadRequest(new { message = "ID mismatch." });
            }
    
            var result = _userAction.ChangePassword(id, passwordData);
    
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }
    
            return Ok(result);
        }
    }
}