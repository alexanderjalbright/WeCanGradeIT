﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WeCanGradeIT;

namespace WeCanGradeIT.Migrations
{
    [DbContext(typeof(WCGIContext))]
    partial class WCGIContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.8-servicing-32085")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WeCanGradeIT.Models.Assignment", b =>
                {
                    b.Property<int>("AssignmentId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<DateTime>("DueDate");

                    b.Property<string>("Name");

                    b.Property<string>("Requirements");

                    b.Property<string>("Type");

                    b.HasKey("AssignmentId");

                    b.ToTable("Assignments");

                    b.HasData(
                        new { AssignmentId = 1, Description = "University Clinic Hospital is an organizational mess. They have unkempt files of employee information scattered throughout manilla folders, computer data files, and old tin filing cabinets. With the madness of the daily grind, patients are the priority. But the utmost care cannot be given to the patients if the hospital is disorganized. University Clinic Hospital wants to get it together. They have subcontracted We Can Code IT full-stack apprentices (who work for the reasonably inexpensive price of free) to come in and organize. They enable you to set up shop with a few company laptops in an old disheveled break room. Your mission is to create a set of classes that contain information on the employees at University Clinic Hospital.", DueDate = new DateTime(2019, 4, 26, 9, 30, 0, 0, DateTimeKind.Unspecified), Name = "University Clinic Hospital", Requirements = "* There must be a Program Class, Employee Class, and Patient Class  * There will be 4 classes derived from the Employee Class  * Think about states and behaviors in regard to what class should do what  * Classes must use appropriate methods in regard to their type  * Some classes will make use of abstract methods and some methods will be overridden where appropriate", Type = "Individual" },
                        new { AssignmentId = 2, Description = "Create a portfolio site highlighting your work that can be shared with potential employers. Focus first on building a good structure, then later style and lay out with with CSS.", DueDate = new DateTime(2019, 5, 15, 9, 30, 0, 0, DateTimeKind.Unspecified), Name = "Professional Portfolio", Requirements = "* HTML  * CSS  * CSS Grid or Flexbox  ", Type = "Individual" }
                    );
                });

            modelBuilder.Entity("WeCanGradeIT.Models.Grade", b =>
                {
                    b.Property<int>("GradeId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AssignmentId");

                    b.Property<string>("BranchName");

                    b.Property<string>("Comment");

                    b.Property<string>("RepoName");

                    b.Property<string>("RepoUrl");

                    b.Property<int>("StudentId");

                    b.Property<int>("Value");

                    b.HasKey("GradeId");

                    b.HasIndex("AssignmentId");

                    b.HasIndex("StudentId");

                    b.ToTable("Grades");

                    b.HasData(
                        new { GradeId = 1, AssignmentId = 1, Comment = "Your code is clean. Use ternary expressions to refactor some of your if trees.", RepoName = "UniversityClinicHospital", RepoUrl = "https://github.com/alexanderjalbright/UniversityClinicHospital", StudentId = 1, Value = 98 },
                        new { GradeId = 2, AssignmentId = 1, BranchName = "Master", Comment = "Good naming conventions, files are organized, and code is clean.", RepoName = "UniversityClinicHospital", RepoUrl = "https://github.com/MaryMcGeary/UniversityClinicHospital", StudentId = 2, Value = 80 },
                        new { GradeId = 3, AssignmentId = 2, BranchName = "Master", Comment = "Your nav bar drop down menus look very nice. Everything else makes my eyes burn. This may be the worst, but technically passable portfolio I have ever seen.", RepoName = "alexanderjalbright.github.io", RepoUrl = "https://github.com/alexanderjalbright/alexanderjalbright.github.io", StudentId = 1, Value = 97 },
                        new { GradeId = 4, AssignmentId = 2, BranchName = "javascriptBranch", Comment = "SPACE! I love space! Good use of class names and id's. Work on utilizing size units that are dynamic.", RepoName = "marymcgeary.github.io", RepoUrl = "https://github.com/MaryMcGeary/marymcgeary.github.io", StudentId = 2, Value = 100 }
                    );
                });

            modelBuilder.Entity("WeCanGradeIT.Models.Student", b =>
                {
                    b.Property<int>("StudentId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal>("AvgGrade");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<string>("UserName");

                    b.HasKey("StudentId");

                    b.ToTable("Students");

                    b.HasData(
                        new { StudentId = 1, AvgGrade = 0m, FirstName = "Alex", LastName = "Albright", UserName = "alexanderjalbright" },
                        new { StudentId = 2, AvgGrade = 0m, FirstName = "Mary", LastName = "McGeary", UserName = "MaryMcGeary" },
                        new { StudentId = 3, AvgGrade = 0m, FirstName = "Joe", LastName = "Scheiman", UserName = "JoeScheiman" },
                        new { StudentId = 4, AvgGrade = 0m, FirstName = "Michael", LastName = "Mannville", UserName = "Monstro33" },
                        new { StudentId = 5, AvgGrade = 0m, FirstName = "Brian", LastName = "Duer", UserName = "Bpjd21" },
                        new { StudentId = 6, AvgGrade = 0m, FirstName = "Sabrina", LastName = "Andrew", UserName = "sabrina-andrew" },
                        new { StudentId = 7, AvgGrade = 0m, FirstName = "Alden", LastName = "Molina", UserName = "aldenmolina" },
                        new { StudentId = 8, AvgGrade = 0m, FirstName = "Artie", LastName = "Negron", UserName = "anegronjr" }
                    );
                });

            modelBuilder.Entity("WeCanGradeIT.Models.Grade", b =>
                {
                    b.HasOne("WeCanGradeIT.Models.Assignment", "Assignment")
                        .WithMany()
                        .HasForeignKey("AssignmentId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("WeCanGradeIT.Models.Student")
                        .WithMany("Grades")
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
