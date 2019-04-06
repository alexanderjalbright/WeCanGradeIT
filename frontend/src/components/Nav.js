import { Link, Route } from "react-router-dom";

import React, { Component } from "react";

export default class Nav extends Component {
  render() {
    const { user, assignments } = this.props;
    const assignLinks = assignments.map(assignment => (
      <Link to={`/${user.userName}/assignments/${assignment.assignmentId}`}>
        <li>{assignment.name}</li>
      </Link>
    ));
    return (
      <nav>
        <ul>
          <li style={{ flexGrow: "1" }}>
            <h1>
              <span className="we">We</span>
              <span className="can">Can</span>
              <span className="grade">
                {`{`}Grade{`}`}
              </span>
              <span className="it">IT</span>
            </h1>
          </li>
          <li className="nav-assign">
            <Route
              path={`/${user.userName}`}
              component={() => (
                <div>
                  <a href="#">Assignments</a>
                  <ul
                    className="assign-dropdown"
                    style={{ position: "absolute", top: "10" }}
                  >
                    {assignLinks}
                  </ul>
                </div>
              )}
            />
          </li>
          <li>
            <Route
              path={`/${user.userName}`}
              component={() => (
                <Link to={`/${user.userName}/grades`}>Grades</Link>
              )}
            />
          </li>
          <li>
            <Route
              path={`/instructor`}
              component={() => (
                <Link to={`/${user.userName}/students`}>Students</Link>
              )}
            />
          </li>
        </ul>
      </nav>
    );
  }
}
