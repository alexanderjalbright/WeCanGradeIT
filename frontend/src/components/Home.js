import { Link, Route } from "react-router-dom";

import React, { Component } from "react";

export default class Home extends Component {
  setUserClick = student => {
    this.props.setUser(student);
  };
  render() {
    const { students, user } = this.props;
    const selectUserLinks = students.map(student => (
      <option key={student.studentId} value={student.studentId}>
        {student.name}
      </option>
    ));

    return (
      <Route
        path={`/`}
        exact={true}
        component={() => (
          <div>
            <label>Select user:&nbsp;</label>
            <select>
              <option />
              {selectUserLinks}
            </select>
            <button
              onClick={() => {
                const index = document.querySelector("select").value;
                this.setUserClick(students[index]);
              }}
            >
              Select
            </button>
            <Link
              to={
                user.name === "Instructor" ? `/instructor` : `/${user.userName}`
              }
            >
              <button>Enter</button>
            </Link>
            <h2>
              {user.name}
              {user.name === "" ? `` : ` has been selected!`}
            </h2>
          </div>
        )}
      />
    );
  }
}
