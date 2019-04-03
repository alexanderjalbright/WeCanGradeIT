using NSubstitute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WeCanGradeIT.Controllers;
using WeCanGradeIT.Models;
using WeCanGradeIT.Repositories;
using Xunit;

namespace WeCanGradeIT.Tests
{
    public class StudentControllerTests
    {
        StudentController underTest;
        IStudentRepository repo;

        public StudentControllerTests()
        {
            repo = Substitute.For<IStudentRepository>();
            underTest = new StudentController(repo);
        }

        [Fact]
        public void Get_Returns_A_Student()
        {
            var expectedId = 1;
            repo.GetById(expectedId).Returns(new Student() { StudentId = expectedId });
            var result = underTest.Get(expectedId);
            Assert.Equal(expectedId, result.Value.StudentId);
        }

        [Fact]
        public void Get_Returns_List_Of_Students()
        {
            repo.GetAll().Returns(new List<Student>() { new Student(), new Student() });
            var result = underTest.Get();
            Assert.Equal(2, result.Value.Count());
        }
    }
}
