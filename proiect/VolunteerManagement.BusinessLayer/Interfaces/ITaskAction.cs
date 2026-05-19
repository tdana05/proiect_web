using VolunteerManagement.Domain.Models.Responses;
using VolunteerManagement.Domain.Models.Tasks;

namespace VolunteerManagement.BusinessLayer.Interfaces
{
    public interface ITaskAction
    {
        List<TaskDto> GetAllTasks();
        List<TaskDto> GetTasksByAssignee(int assigneeId);
        TaskDto? GetTaskById(int id);
        ActionResponse CreateTask(CreateTaskDto data);
        ActionResponse UpdateTask(int id, UpdateTaskDto data);
        ActionResponse DeleteTask(int id);
    }
}