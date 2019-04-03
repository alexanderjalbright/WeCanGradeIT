import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import React, { Component } from "react";
import Assignment from "./components/Assignment";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      assignments: [],
      students: [{ name: "Instructor", userName: "Instructor", studentId: 0 }],
      user: {}
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

  render() {
    const parseAssignments = this.state.assignments.map(assignment => (
      <Route
        path={`/assignment/${assignment.assignmentId}`}
        exact={true}
        component={() => (
          <Assignment key={assignment.assignmentId} assignment={assignment} />
        )}
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
      <Link to={`/assignment/${assignment.assignmentId}`}>
        {assignment.name}
      </Link>
    ));

    const selectUserLinks = this.state.students.map(student => (
      <option
        value={student.name}
        onClick={() => this.setState({ user: student })}
      >
        {student.name}
      </option>
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
          {assignLinks}
        </nav>
        <div className="App">
          <Route
            path={`/`}
            exact={true}
            component={() => (
              <div>
                <select>{selectUserLinks}</select>
                <Link
                  to={`/${
                    this.state.user.name === "Instructor"
                      ? `instructor`
                      : `${this.state.user.userName}`
                  }`}
                >
                  <button>Enter</button>
                </Link>
                <h2>{this.state.user.name} has been selected!</h2>
              </div>
            )}
          />
          {parseAssignments}
          {parseStudents}
        </div>
      </Router>
    );
  }
}

export default App;
