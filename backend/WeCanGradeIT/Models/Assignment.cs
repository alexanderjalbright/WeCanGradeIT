using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WeCanGradeIT.Models
{
    public class Assignment
    {
        public int AssignmentId { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public string Requirements { get; set; } //Stored as MD format
        public DateTime DueDate { get; set; }
    }
}
