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
        IGradeRepository gradeRepo;
        IStudentRepository studentRepo;

        public GradeController(IGradeRepository gradeRepo, IStudentRepository studentRepo)
        {
            this.gradeRepo = gradeRepo;
            this.studentRepo = studentRepo;
        }

        [HttpPost("{studentId}/{assignmentId}")]
        public ActionResult<bool> Post(int studentId, int assignmentId, [FromBody] string repoUrl)
        {
            var student = studentRepo.GetById(studentId);
            bool exists = false;
            foreach(var grade in student.Grades)
            {
                if(grade.AssignmentId == assignmentId)
                {
                    exists = true;
                }
            }

            if (exists)
            {
                var theGrade = student.Grades.Single(grade => grade.AssignmentId == assignmentId);
                theGrade.RepoUrl = repoUrl;
                gradeRepo.Edit(theGrade);
            }
            else
            {
                var newGrade = new Grade()
                {
                    StudentId = studentId,
                    AssignmentId = assignmentId,
                    RepoUrl = repoUrl
                };
                gradeRepo.Create(newGrade);
            }

            return true;
        }   
    }
}