using Microsoft.EntityFrameworkCore;
using VolunteerManagement.Domain.Entities;

namespace VolunteerManagement.DataAccess.Context
{
    public class UserContext : DbContext
    {
        public DbSet<UserData> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(
                "Server=localhost,1433;Database=VolunteerManagementDB;User Id=sa;Password=Parola123!;TrustServerCertificate=True;"
            );
        }
    }
}