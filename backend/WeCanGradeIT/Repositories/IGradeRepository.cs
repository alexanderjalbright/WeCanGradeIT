using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeCanGradeIT.Models;

namespace WeCanGradeIT.Repositories
{
    public interface IGradeRepository
    {
        IEnumerable<Grade> GetAll();
        bool CheckIfExists(int sId, int aId);
        void CreateOrEdit(int sId, int aId, string repoUrl);
        void Create(Grade grade);
        void Edit(Grade grade);      
    }
}