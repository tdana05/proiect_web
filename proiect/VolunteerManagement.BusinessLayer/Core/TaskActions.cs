using VolunteerManagement.DataAccess.Context;
using VolunteerManagement.Domain.Entities;
using VolunteerManagement.Domain.Models.Responses;
using VolunteerManagement.Domain.Models.Tasks;

namespace VolunteerManagement.BusinessLayer.Core
{
    public class TaskActions
    {
        protected TaskActions() { }

        protected List<TaskDto> GetAllTasksActionExecution()
        {
            var result = new List<TaskDto>();
            using (var db = new TaskContext())
            {
                var tasks = db.Tasks
                    .Where(x => !x.IsDeleted)
                    .ToList();

                foreach (var task in tasks)
                {
                    var assignee = db.Users.FirstOrDefault(u => u.Id == task.AssigneeId && !u.IsDeleted);
                    var owner = db.Users.FirstOrDefault(u => u.Id == task.OwnerId && !u.IsDeleted);
                    result.Add(MapToDto(task, assignee, owner));
                }
            }
            return result;
        }

        protected List<TaskDto> GetTasksByAssigneeActionExecution(int assigneeId)
        {
            var result = new List<TaskDto>();
            using (var db = new VolunteerManagementContext())
            {
                var tasks = db.Tasks
                    .Where(x => x.AssigneeId == assigneeId && !x.IsDeleted)
                    .ToList();

                var assignee = db.Users.FirstOrDefault(u => u.Id == assigneeId && !u.IsDeleted);

                foreach (var task in tasks)
                {
                    var owner = db.Users.FirstOrDefault(u => u.Id == task.OwnerId && !u.IsDeleted);
                    result.Add(MapToDto(task, assignee, owner));
                }
            }
            return result;
        }

        protected TaskDto? GetTaskByIdActionExecution(int id)
        {
            using (var db = new VolunteerManagementContext())
            {
                var task = db.Tasks.FirstOrDefault(x => x.Id == id && !x.IsDeleted);
                if (task == null) return null;

                var assignee = db.Users.FirstOrDefault(u => u.Id == task.AssigneeId && !u.IsDeleted);
                var owner = db.Users.FirstOrDefault(u => u.Id == task.OwnerId && !u.IsDeleted);
                return MapToDto(task, assignee, owner);
            }
        }

        protected ActionResponse CreateTaskActionExecution(CreateTaskDto data)
        {
            using (var db = new VolunteerManagementContext())
            {
                var assignee = db.Users.FirstOrDefault(x => x.Id == data.AssigneeId && !x.IsDeleted);
                if (assignee == null)
                {
                    return new ActionResponse { IsSuccess = false, Message = "Assignee not found." };
                }

                var owner = db.Users.FirstOrDefault(x => x.Id == data.OwnerId && !x.IsDeleted);
                if (owner == null)
                {
                    return new ActionResponse { IsSuccess = false, Message = "Owner not found." };
                }

                var task = new TaskData
                {
                    Title = data.Title,
                    Description = data.Description,
                    Status = data.Status,
                    AssigneeId = data.AssigneeId,
                    OwnerId = data.OwnerId,
                    DueDate = data.DueDate,
                    Priority = data.Priority,
                    Category = data.Category,
                    CreatedAt = DateTime.Now
                };

                db.Tasks.Add(task);
                db.SaveChanges();

                return new ActionResponse { IsSuccess = true, Message = "Task created successfully." };
            }
        }

        protected ActionResponse UpdateTaskActionExecution(int id, UpdateTaskDto data)
        {
            using (var db = new VolunteerManagementContext())
            {
                var task = db.Tasks.FirstOrDefault(x => x.Id == id && !x.IsDeleted);
                if (task == null)
                {
                    return new ActionResponse { IsSuccess = false, Message = "Task not found." };
                }

                task.Title = data.Title;
                task.Description = data.Description;
                task.Status = data.Status;
                task.AssigneeId = data.AssigneeId;
                task.DueDate = data.DueDate;
                task.Priority = data.Priority;
                task.Category = data.Category;
                task.UpdatedAt = DateTime.Now;

                db.SaveChanges();

                return new ActionResponse { IsSuccess = true, Message = "Task updated successfully." };
            }
        }

        protected ActionResponse DeleteTaskActionExecution(int id)
        {
            using (var db = new VolunteerManagementContext())
            {
                var task = db.Tasks.FirstOrDefault(x => x.Id == id);
                if (task == null)
                {
                    return new ActionResponse { IsSuccess = false, Message = "Task not found." };
                }

                task.IsDeleted = true;
                task.UpdatedAt = DateTime.Now;
                db.SaveChanges();

                return new ActionResponse { IsSuccess = true, Message = "Task deleted successfully." };
            }
        }

        private TaskDto MapToDto(TaskData task, UserData? assignee, UserData? owner)
        {
            return new TaskDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                Status = task.Status,
                AssigneeId = task.AssigneeId,
                AssigneeName = assignee?.Name ?? "Unknown",
                OwnerId = task.OwnerId,
                OwnerName = owner?.Name ?? "Unknown",
                DueDate = task.DueDate.ToString("o"),
                CreatedAt = task.CreatedAt.ToString("o"),
                Priority = task.Priority,
                Category = task.Category
            };
        }
    }
}