using System.Security.Cryptography;
using System.Text;
using VolunteerManagement.Domain.Entities;
using VolunteerManagement.Domain.Models.Auth;
using VolunteerManagement.Domain.Models.Responses;
using VolunteerManagement.DataAccess.Context;

namespace VolunteerManagement.BusinessLayer.Core
{
    public class UserActions
    {
        protected UserActions() { }

        protected UserDto? GetUserByEmailActionExecution(string email)
        {
            UserData? user;
            using (var db = new VolunteerManagementContext())
            {
                user = db.Users
                    .FirstOrDefault(x => x.Email.ToLower() == email.ToLower() && !x.IsDeleted);
            }

            if (user == null) return null;

            return MapToUserDto(user);
        }

       protected LoginResponseDto? LoginActionExecution(LoginDto loginData)
       {
           using (var db = new VolunteerManagementContext())
           {
               var user = db.Users
                   .FirstOrDefault(x => x.Email.ToLower() == loginData.Email.ToLower() && !x.IsDeleted);
       
               if (user == null) 
               {
                   Console.WriteLine($"User not found: {loginData.Email}");
                   return null;
               }
       
               // Verify password
               var passwordHash = HashPassword(loginData.Password);
               
               // DEBUG: Afișează hash-urile în consolă
               Console.WriteLine("=== LOGIN DEBUG ===");
               Console.WriteLine($"Email: {loginData.Email}");
               Console.WriteLine($"Password entered: {loginData.Password}");
               Console.WriteLine($"Generated hash (Base64): {passwordHash}");
               Console.WriteLine($"Stored hash in DB: {user.PasswordHash}");
               Console.WriteLine($"Hashes match: {user.PasswordHash == passwordHash}");
               
               if (user.PasswordHash != passwordHash) 
               {
                   Console.WriteLine("Password mismatch - login failed");
                   return null;
               }
       
               // Generate JWT token
               var token = JwtHelper.GenerateToken(user.Id.ToString(), user.Email, user.Role);
       
               return new LoginResponseDto
               {
                   Token = token,
                   User = MapToUserDto(user)
               };
           }
       }

        protected ActionResponse RegisterActionExecution(RegisterDto registerData)
        {
            // Check if user already exists
            using (var db = new VolunteerManagementContext())
            {
                var existingUser = db.Users
                    .FirstOrDefault(x => x.Email.ToLower() == registerData.Email.ToLower() && !x.IsDeleted);

                if (existingUser != null)
                {
                    return new ActionResponse
                    {
                        IsSuccess = false,
                        Message = "A user with this email already exists."
                    };
                }

                var user = new UserData
                {
                    Email = registerData.Email,
                    PasswordHash = HashPassword(registerData.Password),
                    Name = registerData.Name,
                    Role = "volunteer",
                    Status = "pending",
                    Phone = registerData.Phone,
                    Department = registerData.Department,
                    Bio = registerData.Bio,
                    JoinDate = DateTime.Now,
                    TotalHours = 0,
                    TasksCompleted = 0,
                    EventsAttended = 0
                };

                db.Users.Add(user);
                db.SaveChanges();

                return new ActionResponse
                {
                    IsSuccess = true,
                    Message = "User registered successfully. Waiting for admin approval."
                };
            }
        }

        protected List<UserDto> GetAllUsersActionExecution()
        {
            var users = new List<UserDto>();
            using (var db = new VolunteerManagementContext())
            {
                var userData = db.Users.Where(x => !x.IsDeleted).ToList();
                foreach (var user in userData)
                {
                    users.Add(MapToUserDto(user));
                }
            }
            return users;
        }

        protected UserDto? GetUserByIdActionExecution(int id)
        {
            using (var db = new VolunteerManagementContext())
            {
                var user = db.Users.FirstOrDefault(x => x.Id == id && !x.IsDeleted);
                return user != null ? MapToUserDto(user) : null;
            }
        }

        protected ActionResponse UpdateUserActionExecution(int id, UserDto userData)
        {
            using (var db = new VolunteerManagementContext())
            {
                var user = db.Users.FirstOrDefault(x => x.Id == id && !x.IsDeleted);
                if (user == null)
                {
                    return new ActionResponse
                    {
                        IsSuccess = false,
                        Message = "User not found."
                    };
                }

                user.Name = userData.Name;
                user.Phone = userData.Phone;
                user.Department = userData.Department;
                user.Bio = userData.Bio;
                user.Status = userData.Status;
                user.Role = userData.Role;
                user.UpdatedAt = DateTime.Now;

                db.SaveChanges();

                return new ActionResponse
                {
                    IsSuccess = true,
                    Message = "User updated successfully."
                };
            }
        }

        protected ActionResponse DeleteUserActionExecution(int id)
        {
            using (var db = new VolunteerManagementContext())
            {
                var user = db.Users.FirstOrDefault(x => x.Id == id);
                if (user == null)
                {
                    return new ActionResponse
                    {
                        IsSuccess = false,
                        Message = "User not found."
                    };
                }

                user.IsDeleted = true;
                user.UpdatedAt = DateTime.Now;
                db.SaveChanges();

                return new ActionResponse
                {
                    IsSuccess = true,
                    Message = "User deleted successfully."
                };
            }
        }

        protected ActionResponse UpdateUserHoursActionExecution(int userId, int totalHours, int tasksCompleted, int eventsAttended)
        {
            using (var db = new VolunteerManagementContext())
            {
                var user = db.Users.FirstOrDefault(x => x.Id == userId && !x.IsDeleted);
                if (user == null)
                {
                    return new ActionResponse
                    {
                        IsSuccess = false,
                        Message = "User not found."
                    };
                }

                user.TotalHours = totalHours;
                user.TasksCompleted = tasksCompleted;
                user.EventsAttended = eventsAttended;
                user.UpdatedAt = DateTime.Now;
                db.SaveChanges();

                return new ActionResponse
                {
                    IsSuccess = true,
                    Message = "User hours updated successfully."
                };
            }
        }
        protected ActionResponse ChangePasswordActionExecution(int userId, ChangePasswordDto passwordData)
        {
            using (var db = new VolunteerManagementContext())
            {
                var user = db.Users.FirstOrDefault(x => x.Id == userId && !x.IsDeleted);
                if (user == null)
                    return new ActionResponse { IsSuccess = false, Message = "User not found." };

                // Verifică parola curentă folosind aceeași metodă HashPassword
                var currentPasswordHash = HashPassword(passwordData.CurrentPassword);
                if (user.PasswordHash != currentPasswordHash)
                    return new ActionResponse { IsSuccess = false, Message = "Current password is incorrect." };

                // Actualizează cu noua parolă
                user.PasswordHash = HashPassword(passwordData.NewPassword);
                user.UpdatedAt = DateTime.Now;

                db.SaveChanges();
            }

            return new ActionResponse { IsSuccess = true, Message = "Password changed successfully." };
        }

        // Helper methods
        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashedBytes);
            }
        }

        private UserDto MapToUserDto(UserData user)
        {
            return new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                Role = user.Role,
                Status = user.Status,
                Phone = user.Phone,
                JoinDate = user.JoinDate.ToString("o"),
                Department = user.Department,
                Bio = user.Bio,
                TotalHours = user.TotalHours,
                TasksCompleted = user.TasksCompleted,
                EventsAttended = user.EventsAttended
            };
        }
    }
}