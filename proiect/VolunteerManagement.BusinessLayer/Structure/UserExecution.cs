using VolunteerManagement.BusinessLayer.Core;
using VolunteerManagement.BusinessLayer.Interfaces;
using VolunteerManagement.Domain.Models.Auth;
using VolunteerManagement.Domain.Models.Responses;

namespace VolunteerManagement.BusinessLayer.Structure
{
    public class UserExecution : UserActions, IUserAction
    {
        public UserDto? GetUserByEmail(string email)
        {
            return GetUserByEmailActionExecution(email);
        }

        public LoginResponseDto? Login(LoginDto loginData)
        {
            return LoginActionExecution(loginData);
        }

        public ActionResponse Register(RegisterDto registerData)
        {
            return RegisterActionExecution(registerData);
        }

        public List<UserDto> GetAllUsers()
        {
            return GetAllUsersActionExecution();
        }

        public UserDto? GetUserById(int id)
        {
            return GetUserByIdActionExecution(id);
        }

        public ActionResponse UpdateUser(int id, UserDto userData)
        {
            return UpdateUserActionExecution(id, userData);
        }

        public ActionResponse DeleteUser(int id)
        {
            return DeleteUserActionExecution(id);
        }

        public ActionResponse UpdateUserHours(int userId, int totalHours, int tasksCompleted, int eventsAttended)
        {
            return UpdateUserHoursActionExecution(userId, totalHours, tasksCompleted, eventsAttended);
        }
        
        public ActionResponse CreateUser(CreateUserDto userData)
        {
            return CreateUserActionExecution(userData);
        }

        public List<UserDto> SearchUsers(string searchTerm)
        {
            return SearchUsersActionExecution(searchTerm);
        }
    }
}