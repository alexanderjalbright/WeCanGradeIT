using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeCanGradeIT.Models;

namespace WeCanGradeIT.Repositories
{
    public class GradeRepository : IGradeRepository
    {
        WCGIContext db;

        public GradeRepository(WCGIContext db)
        {
            this.db = db;
        }

        public IEnumerable<Grade> GetAll()
        {
            var grades = db.Grades.ToList();
            return grades;
        }

        public void Create(Grade grade)
        {
            db.Add(grade);
            db.SaveChanges();
        }

        public void Edit(Grade grade)
        {
            db.Update(grade);
            db.SaveChanges();
        }

        public bool CheckIfExists(int sId, int aId)
        {
            var exists = db.Grades.Any(grade => grade.StudentId == sId && grade.AssignmentId == aId);
            return exists;
        }

        public void CreateOrEdit(int sId, int aId, string repoUrl)
        {
            if (CheckIfExists(sId, aId))
            {
                var theGrade = db.Grades.Single(grade => grade.StudentId == sId && grade.AssignmentId == aId);
                theGrade.RepoUrl = repoUrl;
                Edit(theGrade);
            }
            else
            {
                var newGrade = new Grade()
                {
                    StudentId = sId,
                    AssignmentId = aId,
                    RepoUrl = repoUrl
                };
                Create(newGrade);
            }
        }
    }
}
