import React, { Component } from "react";
import { Route } from "react-router-dom";

class Grades extends Component {
  render() {
    const { user } = this.props;
    const gradesTable =
      user.name !== "Instructor" && user.name !== ""
        ? user.grades.map(grade => (
            <div>
              {" "}
              <h2>
                {grade.assignment.name}: {grade.value}%
              </h2>
              <p>{grade.comment}</p>
            </div>
          ))
        : console.log("this is where the instructor stuff goes");
    return (
      <Route
        path={`/${user.userName}/grades`}
        exact
        render={() => (
          <div>
            <h1>{user.name}'s Grades</h1>
            {gradesTable}
          </div>
        )}
      />
    );
  }
}

export default Grades;
