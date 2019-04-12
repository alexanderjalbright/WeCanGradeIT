using Microsoft.EntityFrameworkCore.Migrations;

namespace WeCanGradeIT.Migrations
{
    public partial class FirstLastName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Students",
                newName: "LastName");

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Students",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "StudentId",
                keyValue: 1,
                columns: new[] { "FirstName", "LastName" },
                values: new object[] { "Alex", "Albright" });

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "StudentId",
                keyValue: 2,
                columns: new[] { "FirstName", "LastName" },
                values: new object[] { "Mary", "McGeary" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Students");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Students",
                newName: "Name");

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "StudentId",
                keyValue: 1,
                column: "Name",
                value: "Alex Albright");

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "StudentId",
                keyValue: 2,
                column: "Name",
                value: "Mary McGeary");
        }
    }
}
