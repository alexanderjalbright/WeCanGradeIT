import React, { Component } from "react";
import { Route } from "react-router-dom";
import Assignment from "./Assignment";

export default class Assignments extends Component {
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { assignments, user, editAssignment } = this.props;
    const parseAssignments = assignments.map(assignment => (
      <Route
        key={assignment.assignmentId}
        path={`/${user.userName}/assignments/${assignment.assignmentId}`}
        exact={true}
        component={() => (
          <Assignment
            key={assignment.assignmentId}
            assignment={assignment}
            user={user}
            editAssignment={editAssignment}
            resetState={this.props.resetState}
          />
        )}
      />
    ));
    return <div>{parseAssignments}</div>;
  }
}
