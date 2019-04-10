import React, { Component } from "react";
import { Route } from "react-router-dom";
import Assignments from "./Assignments";
import Students from "./Students";

class Grades extends Component {
  studentsFunc = id =>
    this.props.students.map(student => (
      <div key={student.studentId}>
        <h2>Student: {student.name}</h2>
        <h3>
          Grade:{" "}
          {student.grades.some(grade => grade.assignmentId === id)
            ? student.grades.find(grade => grade.assignmentId === id).value
            : ""}
        </h3>
        <h3>
          Comment:{" "}
          {student.grades.some(grade => grade.assignmentId === id)
            ? student.grades.find(grade => grade.assignmentId === id).comment
            : ""}
        </h3>
      </div>
    ));
  render() {
    const { user, assignments, students } = this.props;
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
        : assignments.map(assignment => (
            <div key={assignment.assignmentId}>
              <h1>{assignment.name}</h1>
              {this.studentsFunc(assignment.assignmentId)}
            </div>
          ));
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
