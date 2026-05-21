using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VolunteerManagement.BusinessLayer;
using VolunteerManagement.BusinessLayer.Interfaces;
using VolunteerManagement.Domain.Models.Tasks;

namespace VolunteerManagement.API.Controllers
{
    [Route("api/tasks")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private ITaskAction _taskAction;

        public TasksController()
        {
            var bl = new BusinessLogic();
            _taskAction = bl.TaskAction();
        }

        [HttpGet]
        [Authorize(Policy = "AdminOnly")]
        public IActionResult GetAllTasks()
        {
            var tasks = _taskAction.GetAllTasks();
            return Ok(tasks);
        }

        [HttpGet("assignee/{assigneeId}")]
        [Authorize]
        public IActionResult GetTasksByAssignee(int assigneeId)
        {
            var tasks = _taskAction.GetTasksByAssignee(assigneeId);
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        [Authorize(Policy = "AdminOnly")]
        public IActionResult GetTaskById(int id)
        {
            var task = _taskAction.GetTaskById(id);
            if (task == null)
                return NotFound(new { message = "Task not found." });
            return Ok(task);
        }

        [HttpPost]
        [Authorize(Policy = "AdminOnly")]
        public IActionResult CreateTask([FromBody] CreateTaskDto data)
        {
            var result = _taskAction.CreateTask(data);
            if (!result.IsSuccess)
                return BadRequest(result);
            return Ok(result);
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "AdminOnly")]
        public IActionResult UpdateTask(int id, [FromBody] UpdateTaskDto data)
        {
            if (id != data.Id)
                return BadRequest(new { message = "ID mismatch." });

            var result = _taskAction.UpdateTask(id, data);
            if (!result.IsSuccess)
                return NotFound(result);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "AdminOnly")]
        public IActionResult DeleteTask(int id)
        {
            var result = _taskAction.DeleteTask(id);
            if (!result.IsSuccess)
                return NotFound(result);
            return Ok(result);
        }
    }
}