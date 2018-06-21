using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;

public class APIContext : DbContext
{
    public APIContext(DbContextOptions<APIContext> options)
        : base(options)
    {

    }
    public DbSet<Message> MessageItems { get; set; }
    public DbSet<User> UserItems { get; set; }
}