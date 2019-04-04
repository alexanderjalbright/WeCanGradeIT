import React, { Component } from "react";
import { Route } from "react-router-dom";
import Assignment from "./Assignment";

export default class Assignments extends Component {
  render() {
    const { assignments, userName } = this.props;
    const parseAssignments = assignments.map(assignment => (
      <Route
        key={assignment.assignmentId}
        path={`/${userName}/assignments/${assignment.assignmentId}`}
        exact={true}
        component={() =>
          userName === "instructor" ? (
            <h1>INSTRUCTOR PAGE</h1>
          ) : (
            <Assignment key={assignment.assignmentId} assignment={assignment} />
          )
        }
      />
    ));
    return <div>{parseAssignments}</div>;
  }
}
