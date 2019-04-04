using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WeCanGradeIT.Migrations
{
    public partial class AddedNewSeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Assignments",
                columns: new[] { "AssignmentId", "Description", "DueDate", "Name", "Requirements", "Type" },
                values: new object[] { 3, "Create a webapp which will utilize a database and CRUD operations.", new DateTime(2019, 3, 5, 23, 30, 0, 0, DateTimeKind.Unspecified), "Reviews Site", "* Database  * Models  * MVC  * CRUD  ", "Team" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Assignments",
                keyColumn: "AssignmentId",
                keyValue: 3);
        }
    }
}
