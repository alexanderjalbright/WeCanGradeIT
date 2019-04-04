import React, { Component } from "react";
import { Route } from "react-router-dom";

class Grades extends Component {
  render() {
    const { user } = this.props;
    const gradesTable = user.grades.map(grade => (
      <div>
        {" "}
        <h2>
          {grade.assignment.name}: {grade.value}%
        </h2>
        <p>{grade.comment}</p>
      </div>
    ));
    return (
      <div>
        <h1>{user.name}'s Grades</h1>
        {gradesTable}
      </div>
    );
  }
}

export default Grades;
