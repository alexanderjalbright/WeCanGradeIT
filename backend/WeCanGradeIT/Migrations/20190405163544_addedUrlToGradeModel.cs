using Microsoft.EntityFrameworkCore.Migrations;

namespace WeCanGradeIT.Migrations
{
    public partial class addedUrlToGradeModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RepoUrl",
                table: "Grade",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RepoUrl",
                table: "Grade");
        }
    }
}
