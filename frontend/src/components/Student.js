import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { gitHubApi } from "../lib/constants";
import StudentStyle from "./StudentStyle.css";

export default class Student extends Component {
  constructor() {
    super();
    this.state = {
      info: {},
      nextAssignment: {}
    };
  }

  getImage() {
    const { user } = this.props;
    fetch(`${gitHubApi}/users/${user.userName}`)
      .then(res => res.json())
      .then(json => this.setState({ info: json }));
  }

  getNextDueAssignment() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;

    const { assignments } = this.props;
    let current = {};
    let dueAfterToday = [];
    let count = 0;
    assignments.forEach(assignment => {
      if (assignment.dueDate.slice(2, 5) >= today.slice(2, 5)) {
        if (assignment.dueDate.slice(5, 7) >= today.slice(5, 7)) {
          if (assignment.dueDate.slice(8, 10) >= today.slice(8, 10)) {
            dueAfterToday.push(count);
          }
        }
      }
      count++;
    });
    if (dueAfterToday.length > 0) {
      let i = 0;
      for (i = 0; i < dueAfterToday.length; i++) {
        if (i <= 0) {
          current = assignments[dueAfterToday[i]];
        }
        if (
          assignments[dueAfterToday[i]].dueDate.slice(2, 5) <=
          current.dueDate.slice(2, 5)
        ) {
          if (
            assignments[dueAfterToday[i]].dueDate.slice(5, 7) <=
            current.dueDate.slice(5, 7)
          ) {
            if (
              assignments[dueAfterToday[i]].dueDate.slice(8, 10) <
              current.dueDate.slice(8, 10)
            ) {
              current = assignments[dueAfterToday[i]];
            }
          }
        }
      }
    }
    return current;
  }

  render() {
    const { user } = this.props;
    const nextDue = this.getNextDueAssignment();
    return (
      <Route
        path={`/${user.userName}`}
        exact
        component={() => (
          <div className="student-home">
            <h1 className="student-name">
              {user.firstName} {user.lastName}
            </h1>
            {this.state.info.login === user.userName || this.getImage()}
            <img
              className="student-pic"
              src={this.state.info.avatar_url}
              alt="Student Avatar"
            />

            <h1 className="student-duedate">
              Next Assignment Due: {nextDue.dueDate.slice(5, 10)}
            </h1>
            <div>
              <Link
                to={`/${user.userName}/assignments/${nextDue.assignmentId}`}
              >
                {nextDue.name}
              </Link>
            </div>
          </div>
        )}
      />
    );
  }
}
