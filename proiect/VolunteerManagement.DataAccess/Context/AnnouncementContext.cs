using Microsoft.EntityFrameworkCore;
using VolunteerManagement.Domain.Entities;

namespace VolunteerManagement.DataAccess.Context
{
    public class AnnouncementContext : DbContext
    {
        public DbSet<AnnouncementData> Announcements { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=localhost\\SQLEXPRESS;Database=VolunteerManagementDB;Trusted_Connection=True;MultipleActiveResultSets=true;Encrypt=False;");
        }
    }
}