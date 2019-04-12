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
    public class StudentController : ControllerBase
    {
        IStudentRepository repo;
        public StudentController(IStudentRepository repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Student>> Get()
        {
            var students = repo.GetAll();
            foreach(var student in students)
            {
                int average = OverallGrade(student.StudentId);
                student.AvgGrade = average;
                repo.Edit(student);
            }

            return students.ToArray();
        }

        [HttpGet("{id}")]
        public ActionResult<Student> Get(int id)
        {
            var student = repo.GetById(id);
            return student;
        }

        [HttpPost]
        public ActionResult<bool> Post([FromBody] Student student)
        {
            student.StudentId = 0;
            repo.Create(student);
            return true;
        }

        public int OverallGrade(int id)
        {
            var student = repo.GetById(id);
            int total = 0;
            int numberOfGrades = 0;
            foreach(var grade in student.Grades)
            {
                if(grade.Value > 0 && grade.Value <= 100)
                {
                    total += grade.Value;
                    numberOfGrades++;
                }
            }

            int average = 0;
            if(numberOfGrades > 0)
            {
                average = total / numberOfGrades;
            }

            return average;
        }
    }
}