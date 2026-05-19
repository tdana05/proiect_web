using VolunteerManagement.BusinessLayer.Core;
using VolunteerManagement.BusinessLayer.Interfaces;
using VolunteerManagement.Domain.Models.Responses;
using VolunteerManagement.Domain.Models.Tasks;

namespace VolunteerManagement.BusinessLayer.Structure
{
    public class TaskExecution : TaskActions, ITaskAction
    {
        public List<TaskDto> GetAllTasks()
        {
            return GetAllTasksActionExecution();
        }

        public List<TaskDto> GetTasksByAssignee(int assigneeId)
        {
            return GetTasksByAssigneeActionExecution(assigneeId);
        }

        public TaskDto? GetTaskById(int id)
        {
            return GetTaskByIdActionExecution(id);
        }

        public ActionResponse CreateTask(CreateTaskDto data)
        {
            return CreateTaskActionExecution(data);
        }

        public ActionResponse UpdateTask(int id, UpdateTaskDto data)
        {
            return UpdateTaskActionExecution(id, data);
        }

        public ActionResponse DeleteTask(int id)
        {
            return DeleteTaskActionExecution(id);
        }
    }
}