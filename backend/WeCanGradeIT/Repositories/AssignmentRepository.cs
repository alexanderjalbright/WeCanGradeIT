using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeCanGradeIT.Models;

namespace WeCanGradeIT.Repositories
{
    public class AssignmentRepository : IAssignmentRepository
    {
        WCGIContext db; 
        public AssignmentRepository(WCGIContext db)
        {
            this.db = db;
        }

        public IEnumerable<Assignment> GetAll()
        {
            var assignments = db.Assignments.ToArray();

            return assignments;
        }

        public void Create(Assignment newAssignment)
        {
            db.Add(newAssignment);
            db.SaveChanges();
        }

        public void Edit(Assignment assignment)
        {
            db.Update(assignment);
            db.SaveChanges();
        }
    }
}
