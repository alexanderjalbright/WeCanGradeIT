import React, { Component } from "react";
import { Route } from "react-router-dom";
import Assignment from "./Assignment";

export default class Assignments extends Component {
  render() {
    const { assignments, user } = this.props;
    const parseAssignments = assignments.map(assignment => (
      <Route
        key={assignment.assignmentId}
        path={`/${user.userName}/assignments/${assignment.assignmentId}`}
        exact={true}
        component={() =>
          user.name === "Instructor" ? (
            <h1>INSTRUCTOR PAGE</h1>
          ) : (
            <Assignment
              key={assignment.assignmentId}
              assignment={assignment}
              user={user}
            />
          )
        }
      />
    ));
    return <div>{parseAssignments}</div>;
  }
}
