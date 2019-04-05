using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WeCanGradeIT.Models;
using WeCanGradeIT.Repositories;

namespace WeCanGradeIT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GradeController : ControllerBase
    {
        GradeRepository gradeRepo;
        StudentRepository studentRepo;

        public GradeController(GradeRepository gradeRepo, StudentRepository studentRepo)
        {
            this.gradeRepo = gradeRepo;
            this.studentRepo = studentRepo;
        }

        [HttpPost("{studentId}/{assignmentId}")]
        public void Post(int studentId, int assignmentId, [FromBody] string repoUrl)
        {
            var student = studentRepo.GetById(studentId);
            var theGrade = student.Grades.Single(grade => grade.AssignmentId == assignmentId);

            if (theGrade.GradeId == 0)
            {
                var newGrade = new Grade()
                {
                    StudentId = studentId,
                    AssignmentId = assignmentId,
                    RepoUrl = repoUrl
                };
                gradeRepo.Create(newGrade);
            }
            else
            {
                theGrade.RepoUrl = repoUrl;
                gradeRepo.Edit(theGrade);
            }
        }   
    }
}