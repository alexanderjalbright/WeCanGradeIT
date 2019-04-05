using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WeCanGradeIT.Models
{
    public class Grade
    {
        public int GradeId { get; set; }
        public int AssignmentId { get; set; }
        public int StudentId { get; set; }
        public int Value { get; set; }
        public string Comment { get; set; }
        public string RepoUrl { get; set; }
        public virtual Assignment Assignment { get; set; }
    }
}
