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
        public DbSet<ProjectData> Projects { get; set; }
        public DbSet<DocumentData> Documents { get; set; }
        public DbSet<HoursEntryData> HoursEntries { get; set; }
        public DbSet<TaskData> Tasks { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(
                "Server=localhost,1433;Database=VolunteerManagementDB;User Id=sa;Password=Parola123!;TrustServerCertificate=True;"
            );
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Composite unique key for EventAttendee
            modelBuilder.Entity<EventAttendeeData>()
                .HasIndex(ea => new { ea.EventId, ea.UserId })
                .IsUnique();

            // Configure Task foreign keys to avoid multiple cascade paths
            modelBuilder.Entity<TaskData>()
                .HasOne(t => t.Assignee)
                .WithMany()
                .HasForeignKey(t => t.AssigneeId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TaskData>()
                .HasOne(t => t.Owner)
                .WithMany()
                .HasForeignKey(t => t.OwnerId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}