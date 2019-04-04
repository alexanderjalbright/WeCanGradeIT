import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import React, { Component } from "react";
import Assignments from "./components/Assignments";
import Students from "./components/Students";
import Nav from "./components/Nav";
import Home from "./components/Home";
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

  setUser = student => {
    this.setState({ user: student });
  };

  render() {
    const parseStudents = this.state.students.map(student => (
      <Route
        key={student.studentId}
        path={`/${student.username}/`}
        exact={true}
        component={() => <h1>Hi, {this.state.user.name}</h1>}
      />
    ));

    return (
      <Router>
        <Nav user={this.state.user} assignments={this.state.assignments} />
        <div className="App">
          <Home
            students={this.state.students}
            user={this.state.user}
            setUser={this.setUser}
          />
          <Assignments
            assignments={this.state.assignments}
            user={this.state.user}
          />
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
