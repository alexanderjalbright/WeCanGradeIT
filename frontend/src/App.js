import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import React, { Component } from "react";
import Assignments from "./components/Assignments";
import Students from "./components/Students";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Grades from "./components/Grades";
import { apiUrl } from "./lib/constants";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      assignments: [],
      students: [{ name: "Instructor", userName: "instructor", studentId: 0 }],
      user: { name: "", grades: [{ assignment: {} }] }
    };
  }

  componentDidMount() {
    fetch(`${apiUrl}assignment`)
      .then(res => res.json())
      .then(json => this.setState({ assignments: json }));
    fetch(`${apiUrl}student`)
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
    fetch(`${apiUrl}student`, {
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
    const { user, students, assignments } = this.state;

    return (
      <Router>
        <Nav user={user} assignments={assignments} />
        <div className="App">
          <Home students={students} user={user} setUser={this.setUser} />
          <Assignments assignments={assignments} username={user.userName} />

          <Route
            path={`/${user.userName}/grades`}
            exact
            component={() => <Grades user={user} />}
          />

          <Students
            roster={students}
            submitNewStudent={this.submitNewStudent}
          />
        </div>
      </Router>
    );
  }
}

export default App;
