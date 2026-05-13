using System.ComponentModel.DataAnnotations;

namespace VolunteerManagement.Domain.Models.Auth
{
    public class CreateUserDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MinLength(6)]
        public string Password { get; set; } = string.Empty;

        [Required]
        public string Name { get; set; } = string.Empty;

        public string? Role { get; set; } = "volunteer";

        public string? Status { get; set; } = "active";

        public string? Phone { get; set; }

        public string? Department { get; set; }

        public string? Bio { get; set; }
    }
}