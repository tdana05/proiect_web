using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VolunteerManagement.Domain.Entities
{
    public class UserData
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [StringLength(255)]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [StringLength(20)]
        public string Role { get; set; } = "volunteer"; // admin, volunteer

        [Required]
        [StringLength(20)]
        public string Status { get; set; } = "pending"; // pending, active, inactive

        [StringLength(20)]
        public string? Phone { get; set; }

        public DateTime JoinDate { get; set; } = DateTime.Now;

        [StringLength(100)]
        public string? Department { get; set; }

        [StringLength(500)]
        public string? Bio { get; set; }

        public int TotalHours { get; set; } = 0;

        public int TasksCompleted { get; set; } = 0;

        public int EventsAttended { get; set; } = 0;

        public bool IsDeleted { get; set; } = false;

        public DateTime? UpdatedAt { get; set; }
    }
}