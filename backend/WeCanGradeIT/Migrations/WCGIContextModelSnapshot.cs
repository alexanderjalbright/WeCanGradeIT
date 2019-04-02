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
                        new { AssignmentId = 1, Description = "Create a set of classes that contain information on employees at University Clinic Hospital.", DueDate = new DateTime(2019, 4, 24, 9, 30, 0, 0, DateTimeKind.Unspecified), Name = "University Clinic Hospital", Requirements = "* Base Class  * Derived Class  * Abstract Class  ", Type = "Individual" },
                        new { AssignmentId = 2, Description = "Create a portfolio site highlighting your work that can be shared with potential employers.", DueDate = new DateTime(2019, 3, 15, 9, 30, 0, 0, DateTimeKind.Unspecified), Name = "Professional Portfolio", Requirements = "* HTML  * CSS  * CSS Grid or Flexbox  ", Type = "Individual" }
                    );
                });
#pragma warning restore 612, 618
        }
    }
}
