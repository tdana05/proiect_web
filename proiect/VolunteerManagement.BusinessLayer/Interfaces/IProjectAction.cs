using VolunteerManagement.Domain.Models.Project;
using VolunteerManagement.Domain.Models.Responses;

namespace VolunteerManagement.BusinessLayer.Core
{
    public interface IProjectAction
    {
        List<ProjectDto> GetAllProjectsActionExecution();
        ProjectDto? GetProjectByIdActionExecution(int id);
        ActionResponse CreateProjectActionExecution(CreateProjectDto dto);
        ActionResponse UpdateProjectActionExecution(int id, UpdateProjectDto dto);
        ActionResponse DeleteProjectActionExecution(int id);
    }
}