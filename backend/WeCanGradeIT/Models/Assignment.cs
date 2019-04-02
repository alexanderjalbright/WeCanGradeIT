using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WeCanGradeIT.Models
{
    public class Assignment
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public List<string> Requirements { get; set; }
        public DateTime DueDate { get; set; }
    }
}
