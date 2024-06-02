using ImpartaTest.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace ImpartaTest.Server.Data
{
    public class TaskDbContext : DbContext
    {
        public TaskDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Tasks> taskLists { get; set; }
    }
}
