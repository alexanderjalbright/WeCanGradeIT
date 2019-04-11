import React, { Component } from "react";
import { Route } from "react-router-dom";
import { apiUrl } from "../lib/constants";

class Grades extends Component {
  constructor() {
    super();
    this.state = {
      editValue: "",
      editComment: ""
    };
  }
  gradesMapper = grades =>
    grades.map(grade => (
      <div key={grade.gradeId}>
        <h2>Assignment: {grade.assignment.name}</h2>
        <h3>Grade: {grade.value}</h3>
        <p>Comment: {grade.comment}</p>
        <p>
          Repo:{" "}
          <a href={grade.repoUrl} target="_blank">
            {grade.repoUrl}
          </a>
        </p>
        <button onClick={() => this.editGrade(grade)}>Edit</button>
        <div
          className={`grade-edit grade-edit${grade.gradeId}`}
          style={{ display: "none" }}
        >
          <label>Grade:</label>
          <input
            name="editValue"
            value={this.state.editValue}
            onChange={this.onChange}
          />
          <label>Comment:</label>
          <input
            name="editComment"
            value={this.state.editComment}
            onChange={this.onChange}
          />
          <button onClick={() => this.submitGrade(grade)}>
            Submit Changes
          </button>
          <button onClick={() => this.cancelEdit(grade.gradeId)}>Cancel</button>
        </div>
      </div>
    ));

  submitGrade = grade => {
    const editedGrade = {
      assignmentId: grade.assignmentId,
      studentId: grade.studentId,
      value: this.state.editValue,
      comment: this.state.editComment
    };
    const url = `${apiUrl}/grade/${grade.studentId}/${grade.assignmentId}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(editedGrade)
    }).then(res => {
      if (res.ok) {
        this.props.gradeSubmitted(editedGrade);
      }
    });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  cancelEdit = id => {
    const inputGroup = document.querySelector(`.grade-edit${id}`);
    inputGroup.style.display = "none";
  };

  editGrade = grade => {
    this.setState({ editValue: grade.value, editComment: grade.comment });
    const inputGroup = document.querySelector(`.grade-edit${grade.gradeId}`);
    inputGroup.style.display = "block";
  };

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
