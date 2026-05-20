using Microsoft.EntityFrameworkCore;
using VolunteerManagement.Domain.Entities;

namespace VolunteerManagement.DataAccess.Context
{
    public class VolunteerManagementContext : DbContext
    {
        public DbSet<AnnouncementData> Announcements { get; set; }
        public DbSet<UserData> Users { get; set; }
        public DbSet<EventData> Events { get; set; }
        public DbSet<EventAttendeeData> EventAttendees { get; set; }
<<<<<<< HEAD
        public DbSet<ProjectData> Projects { get; set; }
        public DbSet<DocumentData> Documents { get; set; }

=======
        public DbSet<HoursEntryData> HoursEntries { get; set; }  // ← ADAUGAT
        public DbSet<TaskData> Tasks { get; set; }
        
>>>>>>> 6a34e151fa1304bc71f77b1af64e0aed3961bd45
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=localhost\\SQLEXPRESS;Database=VolunteerManagementDB;Trusted_Connection=True;MultipleActiveResultSets=true;Encrypt=False;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Composite unique key for EventAttendee
            modelBuilder.Entity<EventAttendeeData>()
                .HasIndex(ea => new { ea.EventId, ea.UserId })
                .IsUnique();
        }
    }
}