using Microsoft.EntityFrameworkCore.Migrations;

namespace WeCanGradeIT.Migrations
{
    public partial class AddRepoDetails : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BranchName",
                table: "Grades",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RepoName",
                table: "Grades",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BranchName",
                table: "Grades");

            migrationBuilder.DropColumn(
                name: "RepoName",
                table: "Grades");
        }
    }
}
