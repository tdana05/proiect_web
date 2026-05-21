using VolunteerManagement.Domain.Models.Auth;
using VolunteerManagement.Domain.Models.Responses;
using VolunteerManagement.Domain.Enums;

namespace VolunteerManagement.BusinessLayer.Interfaces
{
    public interface IUserAction
    {
        UserDto? GetUserByEmail(string email);
        LoginResponseDto? Login(LoginDto loginData);
        ActionResponse Register(RegisterDto registerData);
        List<UserDto> GetAllUsers();
        UserDto? GetUserById(int id);
        ActionResponse UpdateUser(int id, UserDto userData);
        ActionResponse CreateUser(CreateUserDto userData);
        ActionResponse DeleteUser(int id);
        ActionResponse UpdateUserHours(int userId, int totalHours, int tasksCompleted, int eventsAttended);
        ActionResponse ChangePassword(int userId, ChangePasswordDto passwordData);
    }
}