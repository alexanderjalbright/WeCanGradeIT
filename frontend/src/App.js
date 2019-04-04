import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import React, { Component } from "react";
import Assignment from "./components/Assignment";
import Students from "./components/Students";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      assignments: [],
      students: [{ name: "Instructor", userName: "Instructor", studentId: 0 }],
      user: { name: "" }
    };
  }

  componentDidMount() {
    fetch("https://localhost:44397/api/assignment")
      .then(res => res.json())
      .then(json => this.setState({ assignments: json }));
    fetch("https://localhost:44397/api/student")
      .then(res => res.json())
      .then(json => {
        json.unshift(this.state.students[0]);
        this.setState({ students: json });
      });
  }

  setNewName = text => {
    this.setState({ newName: text });
  };

  setNewUserName = text => {
    this.setState({ newUserName: text });
  };

  submitNewStudent = (newName, newUserName) => {
    const newStudent = {
      name: newName,
      userName: newUserName
    };
    fetch("https://localhost:44397/api/student", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(newStudent)
    }).then(res => {
      if (res.ok) {
        const newStudents = [...this.state.students, newStudent];
        this.setState({ students: newStudents });
        const addForm = document.querySelector(".add-form");
        addForm.style.display = "none";
        const addButton = document.querySelector(".add-button");
        addButton.style.display = "block";
      }
    });
  };

  render() {
    const parseAssignments = this.state.assignments.map(assignment => (
      <Route
        path={`/${this.state.user.userName}/assignments/${
          assignment.assignmentId
        }`}
        exact={true}
        component={() =>
          this.state.user.name === "Instructor" ? (
            <h1>INSTRUCTOR PAGE</h1>
          ) : (
            <Assignment key={assignment.assignmentId} assignment={assignment} />
          )
        }
      />
    ));

    const parseStudents = this.state.students.map(student => (
      <Route
        path={`/student/${student.studentId}`}
        exact={true}
        component={() => <h1>Hi, {this.state.user.name}</h1>}
      />
    ));

    const assignLinks = this.state.assignments.map(assignment => (
      <Route
        path={
          this.state.user.userName === ""
            ? ""
            : `/${this.state.user.userName}/assignments`
        }
        component={() => (
          <Link
            to={`/${this.state.user.userName}/assignments/${
              assignment.assignmentId
            }`}
          >
            {assignment.name}
          </Link>
        )}
      />
    ));

    const selectUserLinks = this.state.students.map(student => (
      <option value={student.studentId}>{student.name}</option>
    ));

    return (
      <Router>
        <nav>
          <h1>
            <span className="we">We</span>
            <span className="can">Can</span>
            <span className="grade">
              {`{`}Grade{`}`}
            </span>
            <span className="it">IT</span>
          </h1>
          <Route
            path={`/${this.state.user.userName}`}
            exact={true}
            component={() => (
              <Link to={`/${this.state.user.userName}/assignments`}>
                Assignments
              </Link>
            )}
          />
          <Route
            path={`/instructor`}
            exact={true}
            component={() => (
              <Link to={`/${this.state.user.userName}/students`}>Students</Link>
            )}
          />

          {assignLinks}
        </nav>
        <div className="App">
          <Route
            path={`/`}
            exact={true}
            component={() => (
              <div>
                <label>Select user:&nbsp;</label>
                <select>
                  <option />
                  {selectUserLinks}
                </select>
                <button
                  onClick={() => {
                    const index = document.querySelector("select").value;
                    this.setState({ user: this.state.students[index] });
                  }}
                >
                  Select
                </button>
                <Link
                  to={
                    this.state.user.name === "Instructor"
                      ? `/instructor`
                      : `/${this.state.user.userName}`
                  }
                >
                  <button>Enter</button>
                </Link>
                <h2>
                  {this.state.user.name}
                  {this.state.user.name === "" ? `` : ` has been selected!`}
                </h2>
              </div>
            )}
          />
          {parseAssignments}
          {parseStudents}
          <Route
            path={`/instructor/students`}
            exact={true}
            component={() => (
              <Students
                roster={this.state.students}
                newName={this.state.newName}
                setNewName={this.setNewName}
                newUserName={this.state.newUserName}
                setNewUserName={this.setNewUserName}
                submitNewStudent={this.submitNewStudent}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
