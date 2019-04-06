import { Link, Route } from "react-router-dom";

import React, { Component } from "react";

export default class Home extends Component {
  setUserClick = student => {
    this.props.setUser(student);
  };

  selectClick = () => {
    const index = document.querySelector(".user-select").value;
    if (index !== "") {
      this.setUserClick(this.props.students[index]);
      const enterSite = document.querySelector(".enter-site");
      enterSite.style.display = "inline";
    }
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
        render={() => (
          <div>
            <label>Select user:&nbsp;</label>
            <select className="user-select">
              <option />
              {selectUserLinks}
            </select>
            <button onClick={this.selectClick}>Select</button>
            <Link
              to={
                user.name === "Instructor" ? `/instructor` : `/${user.userName}`
              }
            >
              <button className="enter-site">Enter</button>
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
