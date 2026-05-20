using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VolunteerManagement.BusinessLayer;
using VolunteerManagement.BusinessLayer.Interfaces;
using VolunteerManagement.Domain.Models.Auth;

namespace VolunteerManagement.API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IUserAction _userAction;

        public AuthController()
        {
            var bl = new BusinessLogic();
            _userAction = bl.UserAction();
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public IActionResult Login([FromBody] LoginDto loginData)
        {
            if (string.IsNullOrWhiteSpace(loginData.Email) || string.IsNullOrWhiteSpace(loginData.Password))
            {
                return BadRequest(new { message = "Email and password are required." });
            }

            var user = _userAction.GetUserByEmail(loginData.Email);
    
            if (user != null && user.Status != "active")
            {
                return BadRequest(new { message = "Contul dumneavoastră este inactiv. Vă rugăm să contactați administratorul." });
            }

            var result = _userAction.Login(loginData);

            if (result == null)
            {
                return Unauthorized(new { message = "Invalid email or password." });
            }

            return Ok(result);
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public IActionResult Register([FromBody] RegisterDto registerData)
        {
            if (string.IsNullOrWhiteSpace(registerData.Email) || 
                string.IsNullOrWhiteSpace(registerData.Password) || 
                string.IsNullOrWhiteSpace(registerData.Name))
            {
                return BadRequest(new { message = "Email, password and name are required." });
            }

            var result = _userAction.Register(registerData);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}