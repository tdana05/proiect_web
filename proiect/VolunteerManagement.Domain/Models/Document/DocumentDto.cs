namespace VolunteerManagement.Domain.Models.Document
{
    public class DocumentDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Type { get; set; } = "other";
        public int UploadedBy { get; set; }
        public DateTime UploadedAt { get; set; }
        public string Size { get; set; } = string.Empty;
        public string Category { get; set; } = "other";
        public string Url { get; set; } = string.Empty;
    }
}