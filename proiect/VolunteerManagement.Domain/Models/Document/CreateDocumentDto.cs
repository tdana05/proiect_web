using System.ComponentModel.DataAnnotations;

namespace VolunteerManagement.Domain.Models.Document
{
    public class CreateDocumentDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;
        public string Type { get; set; } = "other";
        public int UploadedBy { get; set; }
        public string Size { get; set; } = string.Empty;
        public string Category { get; set; } = "other";
        public string Url { get; set; } = string.Empty;
    }
}