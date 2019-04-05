import { BrowserRouter as Router, Route } from "react-router-dom";

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
      students: [
        {
          name: "Instructor",
          userName: "Instructor",
          studentId: 0,
          grades: [{ assignment: "" }]
        }
      ],
      user: { name: "" }
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
          <Grades user={this.state.user} />

          <Students
            roster={this.state.students}
            newName={this.state.newName}
            setNewName={this.setNewName}
            newUserName={this.state.newUserName}
            setNewUserName={this.setNewUserName}
            submitNewStudent={this.submitNewStudent}
          />
        </div>
      </Router>
    );
  }
}

export default App;
