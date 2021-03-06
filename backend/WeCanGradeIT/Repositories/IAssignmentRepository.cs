﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeCanGradeIT.Models;

namespace WeCanGradeIT.Repositories
{
    public interface IAssignmentRepository
    {
        IEnumerable<Assignment> GetAll();

        void Create(Assignment newAssignment);

        void Edit(Assignment assignment);
    }
}
