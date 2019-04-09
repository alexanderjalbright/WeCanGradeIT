using System;
using System.Linq;
using WeCanGradeIT.Controllers;
using Xunit;
using NSubstitute;
using WeCanGradeIT.Repositories;
using System.Collections.Generic;
using WeCanGradeIT.Models;

namespace WeCanGradeIT.Tests
{
    public class AssignmentControllerTests
    {
        AssignmentController underTest;
        IAssignmentRepository repo;

        public AssignmentControllerTests()
        {
             repo = Substitute.For<IAssignmentRepository>();
             underTest = new AssignmentController(repo);
        }

        [Fact]
        public void Get_Returns_List_Of_Assignments() 
        {
            repo.GetAll().Returns(new List<Assignment>() { new Assignment(), new Assignment()});
            var result = underTest.Get();
            Assert.Equal(2, result.Value.Count());
        }

        [Fact]
        public void Post_Creates_Assignment()
        {
            var result = underTest.Post(new Assignment());

            Assert.True(result.Value);
        }
    }
}
