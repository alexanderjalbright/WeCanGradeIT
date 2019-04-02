using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WeCanGradeIT.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Assignments",
                columns: table => new
                {
                    AssignmentId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    Type = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Requirements = table.Column<string>(nullable: true),
                    DueDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assignments", x => x.AssignmentId);
                });

            migrationBuilder.InsertData(
                table: "Assignments",
                columns: new[] { "AssignmentId", "Description", "DueDate", "Name", "Requirements", "Type" },
                values: new object[] { 1, "Create a set of classes that contain information on employees at University Clinic Hospital.", new DateTime(2019, 4, 24, 9, 30, 0, 0, DateTimeKind.Unspecified), "University Clinic Hospital", "* Base Class  * Derived Class  * Abstract Class  ", "Individual" });

            migrationBuilder.InsertData(
                table: "Assignments",
                columns: new[] { "AssignmentId", "Description", "DueDate", "Name", "Requirements", "Type" },
                values: new object[] { 2, "Create a portfolio site highlighting your work that can be shared with potential employers.", new DateTime(2019, 3, 15, 9, 30, 0, 0, DateTimeKind.Unspecified), "Professional Portfolio", "* HTML  * CSS  * CSS Grid or Flexbox  ", "Individual" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Assignments");
        }
    }
}
