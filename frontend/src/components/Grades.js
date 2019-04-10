import React, { Component } from "react";
import { Route } from "react-router-dom";

class Grades extends Component {
  constructor() {
    super();
    this.state = {
      editGrade: "",
      editComment: ""
    };
  }
  gradesMapper = grades =>
    grades.map(grade => (
      <div key={grade.gradeId}>
        <h2>Assignment: {grade.assignment.name}</h2>
        <h3>Grade: {grade.value}</h3>
        <p>Comment: {grade.comment}</p>
      </div>
    ));

  render() {
    const { user, students } = this.props;
    const gradesTable =
      user.name !== "Instructor" && user.name !== ""
        ? user.grades.map(grade => (
            <div>
              <h1>{user.name}'s Grades</h1>
              <div>
                {" "}
                <h2>
                  {grade.assignment.name}: {grade.value}%
                </h2>
                <p>{grade.comment}</p>
              </div>
            </div>
          ))
        : students.map(student =>
            student.name === "Instructor" ? (
              ""
            ) : (
              <div key={student.studentId}>
                <h1>{student.name}</h1>
                {this.gradesMapper(student.grades)}
              </div>
            )
          );
    return (
      <Route
        path={`/${user.userName}/grades`}
        exact
        render={() => <div>{gradesTable}</div>}
      />
    );
  }
}

export default Grades;
