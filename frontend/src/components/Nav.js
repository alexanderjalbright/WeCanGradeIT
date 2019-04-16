import { Link, Route } from "react-router-dom";
import logo from "../WeCanGradeIT.png";

import React, { Component } from "react";

export default class Nav extends Component {
  render() {
    const { user, assignments } = this.props;
    const assignLinks = assignments.map(assignment => (
      <Link
        key={assignment.assignmentId}
        to={`/${user.userName}/assignments/${assignment.assignmentId}`}
      >
        <li>{assignment.name}</li>
      </Link>
    ));
    return (
      <nav>
        <ul>
          <li style={{ flexGrow: "1" }}>
            <a href="/">
              <img src={logo} style={{ width: "200px", margin: "1em 0" }} />
            </a>
          </li>
          <li className="nav-assign">
            <Route
              path={`/${user.userName}`}
              component={() => (
                <div>
                  <Link to={`/${user.userName}/assignments`}>ASSIGNMENTS</Link>
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
                <Link to={`/${user.userName}/grades`}>GRADES</Link>
              )}
            />
          </li>
          <li>
            <Route
              path={`/instructor`}
              component={() => (
                <Link to={`/${user.userName}/students`}>STUDENTS</Link>
              )}
            />
          </li>
          <li onClick={this.props.resetUser}>
            <Route
              path={`/${user.userName}`}
              component={() => <Link to={`/`}>LOGOUT</Link>}
            />
          </li>
        </ul>
      </nav>
    );
  }
}
