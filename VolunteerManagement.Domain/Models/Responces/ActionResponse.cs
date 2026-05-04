namespace VolunteerManagement.Domain.Models.Responces
{
    public class ActionResponse
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; } = string.Empty;
        public object? Data { get; set; }
    }
}