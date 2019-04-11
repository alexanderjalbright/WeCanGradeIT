import React, { Component } from "react";
import { Route } from "react-router-dom";
import { apiUrl } from "../lib/constants";

class Grades extends Component {
  constructor() {
    super();
    this.state = {
      editValue: "",
      editComment: "",
      editingGrade: 0,
      addingGrade: 0,
      addAssignmentId: 0
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
        {this.state.editingGrade !== grade.gradeId && (
          <button onClick={() => this.editGrade(grade)}>Edit</button>
        )}
        {this.state.editingGrade === grade.gradeId && (
          <div className={`grade-edit grade-edit${grade.gradeId}`}>
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
            <button onClick={this.cancelEdit}>Cancel</button>
          </div>
        )}
      </div>
    ));

  submitGrade = grade => {
    const editedGrade = {
      assignmentId: grade.assignmentId * 1,
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
        console.log(editedGrade);
        this.props.gradeSubmitted(editedGrade);
      }
    });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  cancelEdit = () => {
    this.setState({ editingGrade: 0, addingGrade: 0 });
  };

  editGrade = grade => {
    this.setState({
      editValue: grade.value,
      editComment: grade.comment,
      editingGrade: grade.gradeId,
      addingGrade: 0
    });
  };

  assignmentMapper = () =>
    this.props.assignments.map(assignment => (
      <option key={assignment.assignmentId} value={assignment.assignmentId}>
        {assignment.name}
      </option>
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
                {this.state.addingGrade !== student.studentId && (
                  <button
                    className={`add-grade add-grade${student.studentId}`}
                    onClick={() =>
                      this.setState({
                        addingGrade: student.studentId,
                        editingGrade: 0
                      })
                    }
                  >
                    Add Grade
                  </button>
                )}

                {this.state.addingGrade === student.studentId && (
                  <div>
                    <label>Assignment: </label>
                    <select name="addAssignmentId" onChange={this.onChange}>
                      {this.assignmentMapper()}
                    </select>
                    <label>Value:</label>
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
                    <button
                      onClick={() => {
                        this.submitGrade({
                          assignmentId: this.state.addAssignmentId,
                          studentId: student.studentId
                        });
                        this.setState({
                          editValue: 0,
                          editComment: "",
                          addingGrade: 0,
                          editingGrade: 0
                        });
                      }}
                    >
                      Submit Grade
                    </button>
                    <button onClick={this.cancelEdit}>Cancel</button>
                  </div>
                )}
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
