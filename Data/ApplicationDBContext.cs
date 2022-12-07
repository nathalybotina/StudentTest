using Microsoft.EntityFrameworkCore;
using StudentTest.Data.Models;

namespace StudentTest.Data
{
    public class ApplicationDBContext : DbContext
    {
        public string DbPath { get; }
        public ApplicationDBContext()
        {
            DbPath = System.IO.Path.Join(@".\Data\Files\", "localDatabase.db3");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source={DbPath}");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Student>().HasIndex(p => p.UserName).IsUnique();
        }

        public DbSet<Student> Students { get; set; }
    }
}
