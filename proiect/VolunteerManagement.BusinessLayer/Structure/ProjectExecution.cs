using VolunteerManagement.BusinessLayer.Core;
using VolunteerManagement.BusinessLayer.Interfaces;
using VolunteerManagement.Domain.Models.Project;
using VolunteerManagement.Domain.Models.Responses;

namespace VolunteerManagement.BusinessLayer.Structure
{
    public class ProjectExecution : ProjectActions, IProjectAction
    {
        public List<ProjectDto> GetAllProjects() => GetAllProjectsActionExecution();
        public ProjectDto? GetProjectById(int id) => GetProjectByIdActionExecution(id);
        public ActionResponse CreateProject(CreateProjectDto dto) => CreateProjectActionExecution(dto);
        public ActionResponse UpdateProject(int id, UpdateProjectDto dto) => UpdateProjectActionExecution(id, dto);
        public ActionResponse DeleteProject(int id) => DeleteProjectActionExecution(id);
    }
}