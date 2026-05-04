using Microsoft.AspNetCore.Mvc;
using VolunteerManagement.DataAccess.Context;

namespace VolunteerManagement.API.Controllers
{
    [Route("api/health")]
    [ApiController]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public IActionResult Check()
        {
            return Ok(new 
            { 
                status = "Healthy", 
                timestamp = DateTime.Now,
                message = "API is running successfully!"
            });
        }

        [HttpGet("db")]
        public IActionResult CheckDatabase()
        {
            try
            {
                using (var db = new VolunteerManagementContext())
                {
                    var canConnect = db.Database.CanConnect();
                    
                    if (canConnect)
                    {
                        return Ok(new 
                        { 
                            status = "Healthy", 
                            database = "Connected",
                            timestamp = DateTime.Now
                        });
                    }
                    else
                    {
                        return StatusCode(503, new 
                        { 
                            status = "Unhealthy", 
                            database = "Disconnected",
                            timestamp = DateTime.Now
                        });
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(503, new 
                { 
                    status = "Unhealthy", 
                    database = "Error",
                    error = ex.Message,
                    timestamp = DateTime.Now
                });
            }
        }
    }
}