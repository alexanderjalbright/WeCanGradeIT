using System;
using System.Collections.Generic;
using System.Text;
using WeCanGradeIT.Controllers;
using Xunit;

namespace WeCanGradeIT.Tests
{
    public class StudentControllerTests
    {
        StudentController underTest;
        public StudentControllerTests()
        {
            underTest = new StudentController();

        }

        [Fact]
        public void Get_Returns_A_Student()
        {
            var result = underTest.Get(1);
            Assert.Equal(1, result);
        }
    }
}
