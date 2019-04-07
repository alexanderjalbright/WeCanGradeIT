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
        IGradeRepository repo;

        public GradeController(IGradeRepository repo)
        {
            this.repo = repo;
        }

        [HttpPost("{studentId}/{assignmentId}")]
        public ActionResult<bool> Post(int studentId, int assignmentId, [FromBody] string repoUrl)
        {
            repo.CreateOrEdit(studentId, assignmentId, repoUrl);
            return true;
        }   
    }
}