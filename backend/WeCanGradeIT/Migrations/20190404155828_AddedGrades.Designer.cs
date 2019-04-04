﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WeCanGradeIT;

namespace WeCanGradeIT.Migrations
{
    [DbContext(typeof(WCGIContext))]
    [Migration("20190404155828_AddedGrades")]
    partial class AddedGrades
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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
                        new { AssignmentId = 1, Description = "Create a set of classes that contain information on employees at University Clinic Hospital.", DueDate = new DateTime(2019, 4, 24, 9, 30, 0, 0, DateTimeKind.Unspecified), Name = "University Clinic Hospital", Requirements = "* Base Class  * Derived Class  * Abstract Class  ", Type = "Individual" },
                        new { AssignmentId = 2, Description = "Create a portfolio site highlighting your work that can be shared with potential employers.", DueDate = new DateTime(2019, 3, 15, 9, 30, 0, 0, DateTimeKind.Unspecified), Name = "Professional Portfolio", Requirements = "* HTML  * CSS  * CSS Grid or Flexbox  ", Type = "Individual" }
                    );
                });

            modelBuilder.Entity("WeCanGradeIT.Models.Grade", b =>
                {
                    b.Property<int>("GradeId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AssignmentId");

                    b.Property<string>("Comment");

                    b.Property<int>("StudentId");

                    b.Property<int>("Value");

                    b.HasKey("GradeId");

                    b.HasIndex("AssignmentId");

                    b.HasIndex("StudentId");

                    b.ToTable("Grade");

                    b.HasData(
                        new { GradeId = 1, AssignmentId = 1, Comment = "Great Job!", StudentId = 1, Value = 100 },
                        new { GradeId = 2, AssignmentId = 1, Comment = "Fantastic!", StudentId = 2, Value = 96 },
                        new { GradeId = 3, AssignmentId = 2, Comment = "You're the Best!", StudentId = 1, Value = 97 },
                        new { GradeId = 4, AssignmentId = 2, Comment = "Can't be any better!", StudentId = 2, Value = 100 }
                    );
                });

            modelBuilder.Entity("WeCanGradeIT.Models.Student", b =>
                {
                    b.Property<int>("StudentId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("AssignmentId");

                    b.Property<string>("Name");

                    b.Property<string>("UserName");

                    b.HasKey("StudentId");

                    b.HasIndex("AssignmentId");

                    b.ToTable("Students");

                    b.HasData(
                        new { StudentId = 1, Name = "Alex Albright", UserName = "alexanderjalbright" },
                        new { StudentId = 2, Name = "Mary McGeary", UserName = "MaryMcGeary" }
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

            modelBuilder.Entity("WeCanGradeIT.Models.Student", b =>
                {
                    b.HasOne("WeCanGradeIT.Models.Assignment")
                        .WithMany("Students")
                        .HasForeignKey("AssignmentId");
                });
#pragma warning restore 612, 618
        }
    }
}
