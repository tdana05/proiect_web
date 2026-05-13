using Microsoft.EntityFrameworkCore;
using VolunteerManagement.Domain;

namespace VolunteerManagement.DataAccess.Context;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    // TABEL în baza de date
    public DbSet<Volunteer> Volunteers { get; set; }
}using Microsoft.EntityFrameworkCore;
using VolunteerManagement.Domain.Entities;

namespace VolunteerManagement.DataAccess.Context
{
    public class VolunteerManagementContext : DbContext
    {
        public DbSet<AnnouncementData> Announcements { get; set; }
        public DbSet<DocumentData> Documents { get; set; }
        public DbSet<ProjectData> Projects { get; set; }
        // Aici se va adăuga și celelalte DbSet-uri:
        // public DbSet<UserData> Users { get; set; }
        // public DbSet<EventData> Events { get; set; }
        // etc.

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=VolunteerManagementDB;Trusted_Connection=True;MultipleActiveResultSets=true");
        }
    }
}