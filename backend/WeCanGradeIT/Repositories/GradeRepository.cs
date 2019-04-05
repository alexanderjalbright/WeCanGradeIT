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


    }
}
