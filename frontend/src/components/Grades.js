import React, { Component } from "react";
import { Route } from "react-router-dom";
import { apiUrl } from "../lib/constants";
import grades from "../components/Grades.css";

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
    grades.map((grade, index) => (
      <div className="assignment-parent" key={grade.gradeId}>
        {index === 0 && (
          <div className="assignment-table assignment-header">
            <h2>Assignment</h2>
            <h2>Repo</h2>
            <h2>Grade</h2>
          </div>
        )}
        <div className="assignment-table">
          <h3 className="assignment">{grade.assignment.name}</h3>
          <h3 className="grade">{grade.value}%</h3>
          <h3 className="repo">
            <a href={grade.repoUrl} target="_blank">
              {grade.repoName}
              {grade.branchName === "" ||
                grade.branchName === null ||
                ` (${grade.branchName})`}
            </a>
          </h3>
          {this.state.editingGrade !== grade.gradeId && (
            <button
              className="grade-btn btn"
              onClick={() => this.editGrade(grade)}
            >
              Edit
            </button>
          )}
          <p className="comment">
            <span className="comment-title">Comment:</span> <br />
            {grade.comment}
          </p>
        </div>

        {this.state.editingGrade === grade.gradeId && (
          <div className={`grade-edit grade-edit${grade.gradeId}`}>
            <label>Grade:</label>
            <input
              className="grade-input grade-input-value"
              name="editValue"
              value={this.state.editValue}
              onChange={this.onChange}
            />
            <label>Comment:</label>
            <textarea
              className="grade-input"
              name="editComment"
              value={this.state.editComment}
              onChange={this.onChange}
            />
            <button
              className="grade-btn edit-grade-btn submit-edit-btn"
              onClick={() => this.submitGrade(grade)}
            >
              Submit Changes
            </button>
            <button
              className="grade-btn edit-grade-btn"
              onClick={this.cancelEdit}
            >
              Cancel
            </button>
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
        this.props.gradeSubmitted();
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
      user.firstName !== "Instructor" && user.firstName !== "" ? (
        <div className="user-grades-page">
          <h1>
            {`${user.firstName} ${user.lastName}`}{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Overall Grade: {user.avgGrade}%
          </h1>
          {user.grades.map(grade => (
            <div>
              <div>
                {" "}
                <h2>
                  {grade.assignment.name}: {grade.value}%
                </h2>
                <p>{grade.comment}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        students.map(student =>
          student.firstName === "Instructor" ? (
            ""
          ) : (
            <div key={student.studentId}>
              <div className="student-table">
                <h1>{`${student.firstName} ${student.lastName}`}</h1>
                <h1>{student.avgGrade}%</h1>
                {this.state.addingGrade !== student.studentId && (
                  <button
                    className={`grade-btn add-grade add-grade${
                      student.studentId
                    }`}
                    onClick={() =>
                      this.setState({
                        addingGrade: student.studentId,
                        editingGrade: 0,
                        editValue: 0,
                        editComment: ""
                      })
                    }
                  >
                    Add Grade
                  </button>
                )}
              </div>
              <div>
                {this.gradesMapper(student.grades)}
                {this.state.addingGrade === student.studentId && (
                  <div>
                    <label>Assignment: </label>
                    <select name="addAssignmentId" onChange={this.onChange}>
                      <option value="" selected disabled hidden>
                        Choose here
                      </option>
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
                      className="grade-btn"
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
                    <button className="grade-btn" onClick={this.cancelEdit}>
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        )
      );
    return (
      <Route
        path={`/${user.userName}/grades`}
        exact
        render={() => (
          <div>
            {user.userName === "Instructor" && (
              <div className="table-header">
                <h1>Student</h1>
                <h1>Overall Grade</h1>
              </div>
            )}
            {gradesTable}
          </div>
        )}
      />
    );
  }
}

export default Grades;
