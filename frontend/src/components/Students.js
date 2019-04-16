import React, { Component } from "react";
import { Route } from "react-router-dom";

export default class Students extends Component {
  constructor() {
    super();
    this.state = {
      newLastName: "",
      newFirstName: "",
      newUserName: "",
      editingStudent: 0,
      editFirstName: "",
      editLastName: "",
      editUserName: ""
    };
  }

  lastNameChange = e => {
    this.setState({ newLastName: e.target.value });
  };

  firstNameChange = e => {
    this.setState({ newFirstName: e.target.value });
  };

  userNameChange = e => {
    this.setState({ newUserName: e.target.value });
  };

  submitClick = () => {
    this.props.submitNewStudent(
      this.state.newFirstName,
      this.state.newLastName,
      this.state.newUserName
    );
    this.setState({ newFirstName: "", newLastName: "", newUserName: "" });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitChanges = id => {
    const student = {
      firstName: this.state.editFirstName,
      lastName: this.state.editLastName,
      userName: this.state.editUserName,
      studentId: id
    };
    this.props.submitEditStudent(student);
    this.setState({
      editingStudent: 0,
      editFirstName: "",
      editLastName: "",
      editUserName: ""
    });
  };

  render() {
    const { roster } = this.props;
    const studentHome = roster.map(student => (
      <div>
        {student.firstName === "Instructor" || (
          <div className="student-div-2">
            <h1 className="student-name-h1">
              {student.firstName} {student.lastName}
            </h1>
            <h2 className="student-name-h2">{student.userName}</h2>
            {this.state.editingStudent !== student.studentId && (
              <button
                className="edit-student-btn"
                onClick={() =>
                  this.setState({
                    editingStudent: student.studentId,
                    editFirstName: student.firstName,
                    editLastName: student.lastName,
                    editUserName: student.userName
                  })
                }
              >
                Edit
              </button>
            )}
            {this.state.editingStudent === student.studentId && (
              <div>
                <label className="first-name-label">First Name:</label>
                <input
                  className="first-name-input"
                  value={this.state.editFirstName}
                  onChange={this.onChange}
                  name="editFirstName"
                />
                <label className="last-name-label">Last Name:</label>
                <input
                  className="last-name-input"
                  value={this.state.editLastName}
                  onChange={this.onChange}
                  name="editLastName"
                />
                <label className="username-label">Username:</label>
                <input
                  className="username-input"
                  value={this.state.editUserName}
                  onChange={this.onChange}
                  name="editUserName"
                />
                <button
                  className="submit-student-btn"
                  onClick={() => this.submitChanges(student.studentId)}
                >
                  Submit Changes
                </button>
                <button
                  className="cancel-btn"
                  onClick={() =>
                    this.setState({
                      editingStudent: 0,
                      editFirstName: "",
                      editLastName: "",
                      editUserName: ""
                    })
                  }
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    ));
    return (
      <Route
        path={`/instructor/students`}
        exact
        render={() => (
          <div className="student-div">
            {studentHome}
            <button
              className="add-student-btn"
              onClick={() => {
                const addForm = document.querySelector(".add-form");
                addForm.style.display = "block";
                const addButton = document.querySelector(".add-button");
                addButton.style.display = "none";
              }}
            >
              Add Student
            </button>
            <div className="add-form" style={{ display: "none" }}>
              <label>First Name:</label>
              <input
                onChange={this.firstNameChange}
                value={this.state.newFirstName}
              />
              <label>Last Name:</label>
              <input
                onChange={this.lastNameChange}
                value={this.state.newLastName}
              />
              <label>Username:</label>
              <input
                onChange={this.userNameChange}
                value={this.state.newUserName}
              />
              <button onClick={this.submitClick}>Submit Student</button>
            </div>
          </div>
        )}
      />
    );
  }
}
