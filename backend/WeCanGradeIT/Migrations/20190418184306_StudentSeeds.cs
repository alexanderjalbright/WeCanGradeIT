using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WeCanGradeIT.Migrations
{
    public partial class StudentSeeds : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Assignments",
                keyColumn: "AssignmentId",
                keyValue: 1,
                columns: new[] { "Description", "DueDate", "Requirements" },
                values: new object[] { "University Clinic Hospital is an organizational mess. They have unkempt files of employee information scattered throughout manilla folders, computer data files, and old tin filing cabinets. With the madness of the daily grind, patients are the priority. But the utmost care cannot be given to the patients if the hospital is disorganized. University Clinic Hospital wants to get it together. They have subcontracted We Can Code IT full-stack apprentices (who work for the reasonably inexpensive price of free) to come in and organize. They enable you to set up shop with a few company laptops in an old disheveled break room. Your mission is to create a set of classes that contain information on the employees at University Clinic Hospital.", new DateTime(2019, 4, 26, 9, 30, 0, 0, DateTimeKind.Unspecified), "* There must be a Program Class, Employee Class, and Patient Class  * There will be 4 classes derived from the Employee Class  * Think about states and behaviors in regard to what class should do what  * Classes must use appropriate methods in regard to their type  * Some classes will make use of abstract methods and some methods will be overridden where appropriate" });

            migrationBuilder.UpdateData(
                table: "Assignments",
                keyColumn: "AssignmentId",
                keyValue: 2,
                columns: new[] { "Description", "DueDate" },
                values: new object[] { "Create a portfolio site highlighting your work that can be shared with potential employers. Focus first on building a good structure, then later style and lay out with with CSS.", new DateTime(2019, 5, 15, 9, 30, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "Grades",
                keyColumn: "GradeId",
                keyValue: 1,
                columns: new[] { "Comment", "RepoName", "RepoUrl", "Value" },
                values: new object[] { "Your code is clean. Use ternary expressions to refactor some of your if trees.", "UniversityClinicHospital", "https://github.com/alexanderjalbright/UniversityClinicHospital", 98 });

            migrationBuilder.UpdateData(
                table: "Grades",
                keyColumn: "GradeId",
                keyValue: 2,
                columns: new[] { "BranchName", "Comment", "RepoName", "RepoUrl", "Value" },
                values: new object[] { "Master", "Good naming conventions, files are organized, and code is clean.", "UniversityClinicHospital", "https://github.com/MaryMcGeary/UniversityClinicHospital", 80 });

            migrationBuilder.UpdateData(
                table: "Grades",
                keyColumn: "GradeId",
                keyValue: 3,
                columns: new[] { "BranchName", "Comment", "RepoName", "RepoUrl" },
                values: new object[] { "Master", "Your nav bar drop down menus look very nice. Everything else makes my eyes burn. This may be the worst, but technically passable portfolio I have ever seen.", "alexanderjalbright.github.io", "https://github.com/alexanderjalbright/alexanderjalbright.github.io" });

            migrationBuilder.UpdateData(
                table: "Grades",
                keyColumn: "GradeId",
                keyValue: 4,
                columns: new[] { "BranchName", "Comment", "RepoName", "RepoUrl" },
                values: new object[] { "javascriptBranch", "SPACE! I love space! Good use of class names and id's. Work on utilizing size units that are dynamic.", "marymcgeary.github.io", "https://github.com/MaryMcGeary/marymcgeary.github.io" });

            migrationBuilder.InsertData(
                table: "Students",
                columns: new[] { "StudentId", "AvgGrade", "FirstName", "LastName", "UserName" },
                values: new object[,]
                {
                    { 3, 0m, "Joe", "Scheiman", "JoeScheiman" },
                    { 4, 0m, "Michael", "Mannville", "Monstro33" },
                    { 5, 0m, "Brian", "Duer", "Bpjd21" },
                    { 6, 0m, "Sabrina", "Andrew", "sabrina-andrew" },
                    { 7, 0m, "Alden", "Molina", "aldenmolina" },
                    { 8, 0m, "Artie", "Negron", "anegronjr" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Students",
                keyColumn: "StudentId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Students",
                keyColumn: "StudentId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Students",
                keyColumn: "StudentId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Students",
                keyColumn: "StudentId",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Students",
                keyColumn: "StudentId",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Students",
                keyColumn: "StudentId",
                keyValue: 8);

            migrationBuilder.UpdateData(
                table: "Assignments",
                keyColumn: "AssignmentId",
                keyValue: 1,
                columns: new[] { "Description", "DueDate", "Requirements" },
                values: new object[] { "Create a set of classes that contain information on employees at University Clinic Hospital.", new DateTime(2019, 4, 24, 9, 30, 0, 0, DateTimeKind.Unspecified), "* Base Class  * Derived Class  * Abstract Class  " });

            migrationBuilder.UpdateData(
                table: "Assignments",
                keyColumn: "AssignmentId",
                keyValue: 2,
                columns: new[] { "Description", "DueDate" },
                values: new object[] { "Create a portfolio site highlighting your work that can be shared with potential employers.", new DateTime(2019, 3, 15, 9, 30, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "Grades",
                keyColumn: "GradeId",
                keyValue: 1,
                columns: new[] { "Comment", "RepoName", "RepoUrl", "Value" },
                values: new object[] { "Great Job!", null, null, 100 });

            migrationBuilder.UpdateData(
                table: "Grades",
                keyColumn: "GradeId",
                keyValue: 2,
                columns: new[] { "BranchName", "Comment", "RepoName", "RepoUrl", "Value" },
                values: new object[] { null, "Fantastic!", null, null, 96 });

            migrationBuilder.UpdateData(
                table: "Grades",
                keyColumn: "GradeId",
                keyValue: 3,
                columns: new[] { "BranchName", "Comment", "RepoName", "RepoUrl" },
                values: new object[] { null, "You're the Best!", null, null });

            migrationBuilder.UpdateData(
                table: "Grades",
                keyColumn: "GradeId",
                keyValue: 4,
                columns: new[] { "BranchName", "Comment", "RepoName", "RepoUrl" },
                values: new object[] { null, "Can't be any better!", null, null });
        }
    }
}
