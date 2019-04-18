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
                    Description = "University Clinic Hospital is an organizational mess. They have unkempt files of employee information scattered throughout manilla folders, computer data files, and old tin filing cabinets. With the madness of the daily grind, patients are the priority. But the utmost care cannot be given to the patients if the hospital is disorganized. University Clinic Hospital wants to get it together. They have subcontracted We Can Code IT full-stack apprentices (who work for the reasonably inexpensive price of free) to come in and organize. They enable you to set up shop with a few company laptops in an old disheveled break room. Your mission is to create a set of classes that contain information on the employees at University Clinic Hospital.",
                    Requirements = "* There must be a Program Class, Employee Class, and Patient Class  * There will be 4 classes derived from the Employee Class  * Think about states and behaviors in regard to what class should do what  * Classes must use appropriate methods in regard to their type  * Some classes will make use of abstract methods and some methods will be overridden where appropriate",
                    DueDate = new DateTime(2019, 4, 26, 9, 30, 0)
                },
                new Assignment()
                {
                    AssignmentId = 2,
                    Name = "Professional Portfolio",
                    Type = "Individual",
                    Description = "Create a portfolio site highlighting your work that can be shared with potential employers. Focus first on building a good structure, then later style and lay out with with CSS.",
                    Requirements = "* HTML  * CSS  * CSS Grid or Flexbox  ",
                    DueDate = new DateTime(2019, 5, 15, 9, 30, 0)
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
                },
                new Student()
                {
                    StudentId = 3,
                    FirstName = "Joe",
                    LastName = "Scheiman",
                    UserName = "JoeScheiman"
                },
                new Student()
                {
                    StudentId = 4,
                    FirstName = "Michael",
                    LastName = "Mannville",
                    UserName = "Monstro33"
                },
                new Student()
                {
                    StudentId = 5,
                    FirstName = "Brian",
                    LastName = "Duer",
                    UserName = "Bpjd21"
                },
                new Student()
                {
                    StudentId = 6,
                    FirstName = "Sabrina",
                    LastName = "Andrew",
                    UserName = "sabrina-andrew"
                },
                new Student()
                {
                    StudentId = 7,
                    FirstName = "Alden",
                    LastName = "Molina",
                    UserName = "aldenmolina"
                },
                new Student()
                {
                    StudentId = 8,
                    FirstName = "Artie",
                    LastName = "Negron",
                    UserName = "anegronjr"
                }
            );

            modelBuilder.Entity<Grade>().HasData(
                new Grade()
                {
                    GradeId = 1,
                    AssignmentId = 1,
                    StudentId = 1, 
                    Value = 98,
                    Comment = "Your code is clean. Use ternary expressions to refactor some of your if trees.",
                    RepoName = "UniversityClinicHospital",
                    RepoUrl = "https://github.com/alexanderjalbright/UniversityClinicHospital"
                },
                new Grade()
                {
                    GradeId = 2,
                    AssignmentId = 1,
                    StudentId = 2,
                    Value = 80,
                    Comment = "Good naming conventions, files are organized, and code is clean.",
                    RepoName = "UniversityClinicHospital",
                    BranchName = "Master",
                    RepoUrl = "https://github.com/MaryMcGeary/UniversityClinicHospital"
                },
                new Grade()
                {
                    GradeId = 3,
                    AssignmentId = 2,
                    StudentId = 1,
                    Value = 97,
                    Comment = "Your nav bar drop down menus look very nice. Everything else makes my eyes burn. This may be the worst, but technically passable portfolio I have ever seen.",
                    RepoName = "alexanderjalbright.github.io",
                    BranchName = "Master",
                    RepoUrl = "https://github.com/alexanderjalbright/alexanderjalbright.github.io"
                },
                new Grade()
                {
                    GradeId = 4,
                    AssignmentId = 2,
                    StudentId = 2,
                    Value = 100,
                    Comment = "SPACE! I love space! Good use of class names and id's. Work on utilizing size units that are dynamic.",
                    RepoName = "marymcgeary.github.io",
                    BranchName = "javascriptBranch",
                    RepoUrl = "https://github.com/MaryMcGeary/marymcgeary.github.io"
                }
            );
            
        }
    }
}
