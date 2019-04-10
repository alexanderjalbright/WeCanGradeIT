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
            // url={this.state.url}
            // repos={this.state.repos}
            // repo={this.state.repo}
            // branches={this.state.branches}
            // branch={this.state.branch}
            // editName={this.state.editName}
            // editType={this.state.editType}
            // editDescription={this.state.editDescription}
            // editRequirements={this.state.editRequirements}
            // editDueDate={this.state.editDueDate}
            // onChange={this.onChange}
          />
        )}
      />
    ));
    return <div>{parseAssignments}</div>;
  }
}
