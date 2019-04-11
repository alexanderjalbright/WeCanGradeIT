﻿using Microsoft.EntityFrameworkCore;
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
        public DbSet<Student> Students { get; set; }

        public DbSet<Grade> Grades { get; set; }

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
                    AssignmentId = 1,
                    Name = "University Clinic Hospital",
                    Type = "Individual",
                    Description = "Create a set of classes that contain information on employees at University Clinic Hospital.",
                    Requirements = "* Base Class  * Derived Class  * Abstract Class  ",
                    DueDate = new DateTime(2019, 4, 24, 9, 30, 0)
                },
                new Assignment()
                {
                    AssignmentId = 2,
                    Name = "Professional Portfolio",
                    Type = "Individual",
                    Description = "Create a portfolio site highlighting your work that can be shared with potential employers.",
                    Requirements = "* HTML  * CSS  * CSS Grid or Flexbox  ",
                    DueDate = new DateTime(2019, 3, 15, 9, 30, 0)
                }
            );

            modelBuilder.Entity<Student>().HasData(
                new Student()
                {
                    StudentId = 1,
                    FirstName = "Alex",
                    LastName = "Albright",
                    UserName = "alexanderjalbright"
                },
                new Student()
                {
                    StudentId = 2,
                    FirstName = "Mary",
                    LastName = "McGeary",
                    UserName = "MaryMcGeary"
                }
            );

            modelBuilder.Entity<Grade>().HasData(
                new Grade()
                {
                    GradeId = 1,
                    AssignmentId = 1,
                    StudentId = 1, 
                    Value = 100,
                    Comment = "Great Job!"
                },
                new Grade()
                {
                    GradeId = 2,
                    AssignmentId = 1,
                    StudentId = 2,
                    Value = 96,
                    Comment = "Fantastic!"
                },
                new Grade()
                {
                    GradeId = 3,
                    AssignmentId = 2,
                    StudentId = 1,
                    Value = 97,
                    Comment = "You're the Best!"
                },
                new Grade()
                {
                    GradeId = 4,
                    AssignmentId = 2,
                    StudentId = 2,
                    Value = 100,
                    Comment = "Can't be any better!"
                }
            );

        }
    }
}
