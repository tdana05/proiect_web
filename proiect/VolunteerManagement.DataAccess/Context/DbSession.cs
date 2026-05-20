namespace VolunteerManagement.DataAccess.Context
{
    public static class DbSession
    {
        public static string ConnectionString { get; set; } = "Server=localhost\\SQLEXPRESS;Database=VolunteerManagementDB;Trusted_Connection=True;MultipleActiveResultSets=true;Encrypt=False;";
    }
}