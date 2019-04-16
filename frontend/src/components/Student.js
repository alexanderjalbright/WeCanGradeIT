import React, { Component } from "react";
import { Route } from "react-router-dom";
import { gitHubApi } from "../lib/constants";

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
    const { assignments } = this.props;
    let current = {};
    let count = 0;
    assignments.forEach(assignment => {
      if (count <= 0) {
        current = assignment;
      }
      if (assignment.dueDate.slice(2, 5) >= current.dueDate.slice(2, 5)) {
        if (assignment.dueDate.slice(5, 7) >= current.dueDate.slice(5, 7)) {
          if (assignment.dueDate.slice(8, 10) > current.dueDate.slice(8, 10)) {
            current = assignment;
          }
        }
      }
      count += 1;
    });
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
          <div>
            {/* {this.state.info.login === user.userName ||
              this.getNextDueAssignment()} */}{" "}
            <h1>{user.userName}</h1>
            <h1>Next Assignment Due: {nextDue.dueDate}</h1>
            {this.state.info.login === user.userName || this.getImage()}
            <img
              src={this.state.info.avatar_url}
              style={{ width: "200px", margin: "1em 0" }}
            />
          </div>
        )}
      />
    );
  }
}
