using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WeCanGradeIT.Models;

namespace WeCanGradeIT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssignmentController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<Assignment>> Get()
        {
            return new List<Assignment> { new Assignment(), new Assignment() };
        }
    }
}