using Microsoft.AspNetCore.Mvc;
using VolunteerManagement.BusinessLayer;
using VolunteerManagement.BusinessLayer.Interfaces;
using VolunteerManagement.Domain.Models.Project;
using VolunteerManagement.BusinessLayer.Core;

namespace VolunteerManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectAction _projectAction;

        public ProjectsController()
        {
            var bl = new BusinessLogic();
            _projectAction = bl.ProjectAction();
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var projects = _projectAction.GetAllProjects();
            return Ok(projects);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var project = _projectAction.GetProjectById(id);
            if (project == null)
                return NotFound(new { message = "Project not found." });
            return Ok(project);
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateProjectDto dto)
        {
            var result = _projectAction.CreateProject(dto);
            if (!result.IsSuccess)
                return BadRequest(result);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UpdateProjectDto dto)
        {
            if (id != dto.Id)
                return BadRequest(new { message = "ID mismatch." });

            var result = _projectAction.UpdateProject(id, dto);
            if (!result.IsSuccess)
                return NotFound(result);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var result = _projectAction.DeleteProject(id);
            if (!result.IsSuccess)
                return NotFound(result);
            return Ok(result);
        }
    }
}