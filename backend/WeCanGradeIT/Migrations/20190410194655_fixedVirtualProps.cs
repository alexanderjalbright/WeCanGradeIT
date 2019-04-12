using Microsoft.EntityFrameworkCore.Migrations;

namespace WeCanGradeIT.Migrations
{
    public partial class fixedVirtualProps : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_Assignments_AssignmentId",
                table: "Students");

            migrationBuilder.DropIndex(
                name: "IX_Students_AssignmentId",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "AssignmentId",
                table: "Students");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AssignmentId",
                table: "Students",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Students_AssignmentId",
                table: "Students",
                column: "AssignmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Assignments_AssignmentId",
                table: "Students",
                column: "AssignmentId",
                principalTable: "Assignments",
                principalColumn: "AssignmentId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
