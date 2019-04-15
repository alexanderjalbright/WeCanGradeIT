import { Link, Route } from "react-router-dom";

import { apiUrl } from "../lib/constants";
import React, { Component } from "react";

export default class Home extends Component {
  componentDidMount() {
    fetch(`${apiUrl}/assignment`)
      .then(res => res.json())
      .then(json => this.setState({ assignments: json }));
    fetch(`${apiUrl}/student`)
      .then(res => res.json())
      .then(json => {
        this.props.resetState(json);
      });
  }
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
        {`${student.firstName} ${student.lastName}`}
      </option>
    ));

    return (
      <Route
        path={`/`}
        exact={true}
        render={() => (
          <div className="login">
            <h2>Select User</h2>
            <select className="user-select" onChange={this.selectClick}>
              <option value="" selected disabled hidden>
                Choose here
              </option>
              {selectUserLinks}
            </select>

            <h2>
              {`${user.firstName} ${user.lastName}`}
              {`${user.firstName} ${user.lastName}` === " "
                ? ``
                : ` has been selected!`}
            </h2>
            <Link
              to={
                user.firstName === "Instructor"
                  ? `/instructor`
                  : `/${user.userName}`
              }
            >
              <button
                className="user-select-btn enter-site"
                style={{ width: "200px" }}
              >
                Enter
              </button>
            </Link>
          </div>
        )}
      />
    );
  }
}
