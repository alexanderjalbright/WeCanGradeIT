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
    public class AssignmentController : ControllerBase
    {
        IAssignmentRepository repo;
        public AssignmentController(IAssignmentRepository repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Assignment>> Get()
        {
            var assignments = repo.GetAll().ToArray();
            return assignments;
        }

        [HttpPost]
        public ActionResult<bool> Post([FromBody] Assignment newAssignment)
        {
            repo.Create(newAssignment);

            return true;
        }
    }
}