using Microsoft.EntityFrameworkCore;
using VolunteerManagement.Domain.Entities;

namespace VolunteerManagement.DataAccess.Context
{
    public class AnnouncementContext : DbContext
    {
        public DbSet<AnnouncementData> Announcements { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(
                "Server=localhost,1433;Database=VolunteerManagementDB;User Id=sa;Password=Parola123!;TrustServerCertificate=True;"
            );
        }
    }
}