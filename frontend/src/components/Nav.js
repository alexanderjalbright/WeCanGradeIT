import { Link, Route } from "react-router-dom";

import React, { Component } from "react";

export default class Nav extends Component {
  render() {
    const { user, assignments } = this.props;
    const assignLinks = assignments.map(assignment => (
      <Route
        key={assignments.assignmentId}
        path={user.userName === "" ? "" : `/${user.userName}/assignments`}
        component={() => (
          <Link to={`/${user.userName}/assignments/${assignment.assignmentId}`}>
            {assignment.name}
          </Link>
        )}
      />
    ));
    return (
      <nav>
        <h1>
          <span className="we">We</span>
          <span className="can">Can</span>
          <span className="grade">
            {`{`}Grade{`}`}
          </span>
          <span className="it">IT</span>
        </h1>
        <Route
          path={`/${user.userName}`}
          component={() => (
            <Link to={`/${user.userName}/assignments`}>Assignments</Link>
          )}
        />
        <Route
          path={`/${user.userName}`}
          component={() => <Link to={`/${user.userName}/grades`}>Grades</Link>}
        />
        <Route
          path={`/instructor`}
          component={() => (
            <Link to={`/${user.userName}/students`}>Students</Link>
          )}
        />

        {assignLinks}
      </nav>
    );
  }
}
