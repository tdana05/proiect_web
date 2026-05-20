using Microsoft.EntityFrameworkCore;
using VolunteerManagement.Domain.Entities;

namespace VolunteerManagement.DataAccess.Context
{
    public class DocumentContext : DbContext
    {
        public DbSet<DocumentData> Documents { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=localhost\\SQLEXPRESS;Database=VolunteerManagementDB;Trusted_Connection=True;MultipleActiveResultSets=true;Encrypt=False;");
        }
    }
}