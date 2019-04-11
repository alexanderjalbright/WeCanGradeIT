import React, { Component } from "react";
import { Route } from "react-router-dom";

export default class Students extends Component {
  constructor() {
    super();
    this.state = {
      newLastName: "",
      newFirstName: "",
      newUserName: ""
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
      <h1>
        {student.firstName === "Instructor"
          ? ""
          : `${student.firstName} ${student.lastName}`}
      </h1>
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
