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
            var students = repo.GetAll().ToArray();
            return students;
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
    }
}