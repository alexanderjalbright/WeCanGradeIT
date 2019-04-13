import { BrowserRouter as Router, Route } from "react-router-dom";

import React, { Component } from "react";
import Assignments from "./components/Assignments";
import Students from "./components/Students";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Grades from "./components/Grades";
import { apiUrl } from "./lib/constants";
import Instructor from "./components/Instructor";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      assignments: [],
      students: [
        {
          firstName: "Instructor",
          lastName: "",
          userName: "Instructor",
          studentId: 0,
          grades: [{ assignment: "" }]
        }
      ],
      user: { firstName: "", lastName: "" }
    };
  }

  componentDidMount() {
    fetch(`${apiUrl}/assignment`)
      .then(res => res.json())
      .then(json => this.setState({ assignments: json }));
    fetch(`${apiUrl}/student`)
      .then(res => res.json())
      .then(json => {
        this.resetState(json);
      });
  }

  submitNewStudent = (newFirstName, newLastName, newUserName) => {
    const newStudent = {
      firstName: newFirstName,
      lastName: newLastName,
      userName: newUserName,
      grades: []
    };
    fetch(`${apiUrl}/student`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(newStudent)
    }).then(res => {
      if (res.ok) {
        fetch(`${apiUrl}/student`)
          .then(res => res.json())
          .then(json => {
            this.setState({ students: json });
          });
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

  addAssignment = () => {
    fetch(`${apiUrl}/assignment`)
      .then(res => res.json())
      .then(json => this.setState({ assignments: json }));
  };

  editAssignment = () => {
    fetch(`${apiUrl}/assignment`)
      .then(res => res.json())
      .then(json => this.setState({ assignments: json }));
  };

  resetState = json => {
    json.unshift(this.state.students[0]);
    this.setState({ students: json });
  };

  gradeSubmitted = () => {
    fetch(`${apiUrl}/student`)
      .then(res => res.json())
      .then(json => {
        this.setState({ students: json });
      });
  };

  submitEditStudent = student => {
    fetch(`${apiUrl}/student/${student.studentId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(student)
    }).then(res => {
      if (res.ok) {
        fetch(`${apiUrl}/student`)
          .then(res => res.json())
          .then(json => {
            this.setState({ students: json });
          });
      }
    });
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
            resetState={this.resetState}
          />
          <Assignments
            assignments={this.state.assignments}
            user={this.state.user}
            editAssignment={this.editAssignment}
          />
          <Grades
            user={this.state.user}
            students={this.state.students}
            gradeSubmitted={this.gradeSubmitted}
            assignments={this.state.assignments}
          />

          <Students
            roster={this.state.students}
            newFirstName={this.state.newFirstName}
            setNewFirstName={this.setNewFirstName}
            newLastName={this.state.newLastName}
            setNewLastName={this.setNewLastName}
            newUserName={this.state.newUserName}
            setNewUserName={this.setNewUserName}
            submitNewStudent={this.submitNewStudent}
            submitEditStudent={this.submitEditStudent}
          />

          <Instructor addAssignment={this.addAssignment} />
        </div>
      </Router>
    );
  }
}

export default App;
