using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeCanGradeIT.Models;

namespace WeCanGradeIT
{
    public class WCGIContext : DbContext
    {
        
        public DbSet<Assignment> Assignments { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = "Server=(localdb)\\mssqllocaldb;Database=WCGIDatabase;Trusted_Connection=True;";

            optionsBuilder.UseSqlServer(connectionString)
                          .UseLazyLoadingProxies();

            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Assignment>().HasData(
                new Assignment()
                {
                    Name = "University Clinic Hospital",
                    Type = "Individual",
                    Description = "Create a set of classes that contain information on employees at University Clinic Hospital.",
                    Requirements = new List<string>()
                        { "Base Class", "Derived Class", "Abstract Class"},
                    DueDate = new DateTime(2019, 4, 24, 9, 30, 0)
                },
                new Assignment()
                {
                    Name = "Professional Portfolio",
                    Type = "Individual",
                    Description = "Create a portfolio site highlighting your work that can be shared with potential employers.",
                    Requirements = new List<string>()
                        { "HTML", "CSS", "CSS Grid or Flexbox" },
                    DueDate = new DateTime(2019, 3, 15, 9, 30, 0)
                }

            );
        }
    }
}
