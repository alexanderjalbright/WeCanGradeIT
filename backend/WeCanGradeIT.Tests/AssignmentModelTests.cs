using System;
using System.Collections.Generic;
using System.Text;
using WeCanGradeIT.Models;
using Xunit;

namespace WeCanGradeIT.Tests
{
    public class AssignmentModelTests
    {
        Assignment underTest;

        public AssignmentModelTests()
        {
            underTest = new Assignment() { Name = "portfolio", Type = "individual", Description = "This is it.", Requirements = new List<string>() { "Do this.", "Do that." }, DueDate = new DateTime() };
        }

        [Fact]
        public void Assignment_Has_A_Name()
        {
            var result = underTest.Name;

            Assert.Equal("portfolio", result);
        }

        [Fact]
        public void Assignment_Has_A_Type()
        {
            var result = underTest.Type;

            Assert.Equal("individual", result);
        }

        [Fact]
        public void Assignment_Has_A_Description()
        {
            var result = underTest.Description;

            Assert.Equal("This is it.", result);
        }

        [Fact]
        public void Assignment_Has_Requirements() 
        {
            var result = underTest.Requirements;

            Assert.Equal(2, result.Count);
        }

        [Fact]
        public void Assignment_Has_Due_Date()
        {
            var result = underTest.DueDate;

            Assert.IsType<DateTime>(result);
        }
    }
}
