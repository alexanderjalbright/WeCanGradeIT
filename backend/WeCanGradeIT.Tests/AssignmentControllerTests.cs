using System;
using System.Linq;
using WeCanGradeIT.Controllers;
using Xunit;

namespace WeCanGradeIT.Tests
{
    public class AssignmentControllerTests
    { 
        [Fact]
        public void Get_Returns_List_Of_Assignments() 
        {
            var underTest = new AssignmentController();

            var result = underTest.Get();

            Assert.Equal(2, result.Value.Count());
        }
    }
}
