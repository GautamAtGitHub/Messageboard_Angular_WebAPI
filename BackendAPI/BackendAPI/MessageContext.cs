using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;

public class MessageContext : DbContext
{
    public MessageContext(DbContextOptions<MessageContext> options)
        : base(options)
    {

    }
    public DbSet<Message> MessageItems { get; set; }
}