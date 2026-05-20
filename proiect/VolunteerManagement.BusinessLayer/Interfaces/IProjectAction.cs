using VolunteerManagement.Domain.Models.Project;
using VolunteerManagement.Domain.Models.Responses;

namespace VolunteerManagement.BusinessLayer.Interfaces
{
    public interface IProjectAction
    {
        List<ProjectDto> GetAllProjects();
        ProjectDto? GetProjectById(int id);
        ActionResponse CreateProject(CreateProjectDto dto);
        ActionResponse UpdateProject(int id, UpdateProjectDto dto);
        ActionResponse DeleteProject(int id);
    }
}