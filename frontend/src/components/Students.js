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

  render() {
    const { roster } = this.props;
    const studentHome = roster.map(student => (
      <div>
        {student.firstName === "Instructor" || (
          <div>
            <h1>
              {student.firstName} {student.lastName}
            </h1>
            <h2>{student.userName}</h2>
            {this.state.editingStudent !== student.studentId && (
              <button
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
          </div>
        )}
      </div>
    ));
    return (
      <Route
        path={`/instructor/students`}
        exact
        render={() => (
          <div>
            {studentHome}
            <button
              className="add-button"
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
