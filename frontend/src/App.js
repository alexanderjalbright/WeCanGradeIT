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
    fetch(`${apiUrl}/assignment`)
      .then(res => res.json())
      .then(json => this.setState({ assignments: json }));
    fetch(`${apiUrl}/student`)
      .then(res => res.json())
      .then(json => {
        this.resetState(json);
      });
  }

  submitNewStudent = (newName, newUserName) => {
    const newStudent = {
      name: newName,
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

  addAssignment = newAssignment => {
    const newAssignments = [...this.state.assignments, newAssignment];
    this.setState({ assignments: newAssignments });
  };

  editAssignment = newAssignment => {
    const index = newAssignment.assignmentId - 1;
    const newAssignments = [...this.state.assignments];
    newAssignments[index] = newAssignment;
    this.setState({ assignments: newAssignments });
  };

  resetState = json => {
    json.unshift(this.state.students[0]);
    this.setState({ students: json });
  };

  gradeSubmitted = grade => {
    const newStudents = [...this.state.students];
    let studentIndex = -1;
    newStudents.forEach((student, index) => {
      if (student.studentId === grade.studentId) {
        studentIndex = index;
      }
    });
    const studentGrades = newStudents[studentIndex].grades;
    let gradeIndex = -1;
    studentGrades.forEach((theirGrade, index) => {
      if (theirGrade.assignmentId === grade.assignmentId) {
        gradeIndex = index;
      }
    });
    if (gradeIndex === -1) {
      const assignment = this.state.assignments.find(
        whichOne => whichOne.assignmentId === grade.assignmentId
      );
      const newGrade = {
        value: grade.value,
        comment: grade.comment,
        assignmentId: grade.assignmentId,
        studentId: grade.studentId,
        repoUrl: "",
        assignment: { name: assignment.name }
      };
      studentGrades.push(newGrade);
      console.log(grade.assignmentId);
    } else {
      studentGrades[gradeIndex].value = grade.value;
      studentGrades[gradeIndex].comment = grade.comment;
    }

    this.setState({ students: newStudents });
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
            newName={this.state.newName}
            setNewName={this.setNewName}
            newUserName={this.state.newUserName}
            setNewUserName={this.setNewUserName}
            submitNewStudent={this.submitNewStudent}
          />

          <Instructor addAssignment={this.addAssignment} />
        </div>
      </Router>
    );
  }
}

export default App;
