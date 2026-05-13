using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VolunteerManagement.Domain.Entities
{
    public class TaskData
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [StringLength(2000)]
        public string Description { get; set; } = string.Empty;

        [Required]
        [StringLength(20)]
        public string Status { get; set; } = "PLANNED"; 

        public int AssigneeId { get; set; } 

        public int OwnerId { get; set; } 

        [Required]
        public DateTime DueDate { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [Required]
        [StringLength(10)]
        public string Priority { get; set; } = "medium"; 

        [StringLength(50)]
        public string Category { get; set; } = string.Empty;

        public bool IsDeleted { get; set; } = false;

        public DateTime? UpdatedAt { get; set; }

        [ForeignKey("AssigneeId")]
        public UserData Assignee { get; set; } = null!;

        [ForeignKey("OwnerId")]
        public UserData Owner { get; set; } = null!;
    }
}