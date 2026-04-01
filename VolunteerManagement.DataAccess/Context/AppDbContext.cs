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
}