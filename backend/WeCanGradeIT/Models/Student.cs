using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WeCanGradeIT.Models
{
    public class Student
    {
        public int StudentId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public virtual List<Grade> Grades { get; set; }
    }
}
