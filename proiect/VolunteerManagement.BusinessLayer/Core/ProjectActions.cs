using VolunteerManagement.Domain.Entities;
using VolunteerManagement.Domain.Models.Project;
using VolunteerManagement.Domain.Models.Responses;
using VolunteerManagement.DataAccess.Context;

namespace VolunteerManagement.BusinessLayer.Core
{
    public class ProjectActions
    {
        protected ProjectActions() { }

        public List<ProjectDto> GetAllProjectsActionExecution()
        {
            var result = new List<ProjectDto>();
            using (var db = new VolunteerManagementContext())
            {
                var projects = db.Projects
                    .Where(p => !p.IsDeleted)
                    .OrderByDescending(p => p.CreatedAt)
                    .ToList();
                foreach (var p in projects)
                {
                    result.Add(MapToDto(p));
                }
            }
            return result;
        }

        public ProjectDto? GetProjectByIdActionExecution(int id)
        {
            using (var db = new VolunteerManagementContext())
            {
                var project = db.Projects
                    .FirstOrDefault(p => p.Id == id && !p.IsDeleted);
                return project != null ? MapToDto(project) : null;
            }
        }

        public ActionResponse CreateProjectActionExecution(CreateProjectDto dto)
        {
            using (var db = new VolunteerManagementContext())
            {
                var project = new ProjectData
                {
                    Name = dto.Name,
                    Description = dto.Description,
                    StartDate = dto.StartDate,
                    EndDate = dto.EndDate,
                    Status = dto.Status,
                    VolunteerIds = SerializeIds(dto.VolunteerIds),
                    LeadId = dto.LeadId,
                    MemberIds = SerializeIds(dto.MemberIds ?? new List<string>()),
                    Progress = dto.Progress,
                    CreatedAt = DateTime.Now
                };
                db.Projects.Add(project);
                db.SaveChanges();
            }
            return new ActionResponse { IsSuccess = true, Message = "Project created successfully." };
        }

        public ActionResponse UpdateProjectActionExecution(int id, UpdateProjectDto dto)
        {
            using (var db = new VolunteerManagementContext())
            {
                var project = db.Projects.FirstOrDefault(p => p.Id == id && !p.IsDeleted);
                if (project == null)
                    return new ActionResponse { IsSuccess = false, Message = "Project not found." };

                project.Name = dto.Name;
                project.Description = dto.Description;
                project.StartDate = dto.StartDate;
                project.EndDate = dto.EndDate;
                project.Status = dto.Status;
                project.VolunteerIds = SerializeIds(dto.VolunteerIds);
                project.LeadId = dto.LeadId;
                project.MemberIds = SerializeIds(dto.MemberIds ?? new List<string>());
                project.Progress = dto.Progress;
                project.UpdatedAt = DateTime.Now;

                db.SaveChanges();
            }
            return new ActionResponse { IsSuccess = true, Message = "Project updated successfully." };
        }

        public ActionResponse DeleteProjectActionExecution(int id)
        {
            using (var db = new VolunteerManagementContext())
            {
                var project = db.Projects.FirstOrDefault(p => p.Id == id);
                if (project == null)
                    return new ActionResponse { IsSuccess = false, Message = "Project not found." };

                project.IsDeleted = true;
                project.UpdatedAt = DateTime.Now;
                db.SaveChanges();
            }
            return new ActionResponse { IsSuccess = true, Message = "Project deleted successfully." };
        }

        // Helper methods
        private string SerializeIds(List<string> ids) => string.Join(",", ids);
        private List<string> DeserializeIds(string ids) => string.IsNullOrEmpty(ids) ? new List<string>() : ids.Split(',').ToList();

        private ProjectDto MapToDto(ProjectData project)
        {
            return new ProjectDto
            {
                Id = project.Id,
                Name = project.Name,
                Description = project.Description,
                StartDate = project.StartDate,
                EndDate = project.EndDate,
                Status = project.Status,
                VolunteerIds = DeserializeIds(project.VolunteerIds),
                LeadId = project.LeadId,
                MemberIds = DeserializeIds(project.MemberIds ?? string.Empty),
                Progress = project.Progress
            };
        }
    }
}