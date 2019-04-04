using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeCanGradeIT.Models;

namespace WeCanGradeIT.Repositories
{
    public class StudentRepository : IStudentRepository
    {
        WCGIContext db;
        public StudentRepository(WCGIContext db) 
        {
            this.db = db;
        }

        public Student GetById(int id)
        {
            var chosenStudent = db.Students.Single(student => student.StudentId == id);

            return chosenStudent;
        }

        public IEnumerable<Student> GetAll()
        {
            var students = db.Students.ToArray();

            return students;
        }

        public void Create(Student student)
        {
            db.Add(student);
            db.SaveChanges();
        }
    }
}
