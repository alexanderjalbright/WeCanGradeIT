import React, { Component } from "react";
import { Route } from "react-router-dom";

export default class Instructor extends Component {
  constructor() {
    super();
    this.state = {
      newAssignment: {
        name: "",
        description: "",
        requirements: "",
        dueDate: "",
        type: ""
      }
    };
  }

  submitNewAssignment = (
    newName,
    newDescription,
    newRequirements,
    newDueDate,
    newType
  ) => {
    const newAssignment = {
      name: newName,
      description: newDescription,
      requirements: newRequirements,
      dueDate: newDueDate,
      type: newType
    };
  };

  addAssignment = event => {
    this.setState({ newAssignment: event.target.value });
  };

  submitClick = () => {
    this.props.submitNewAssignment(this.state.newAssignment);
    this.setState({ newAssignment: "" });
  };

  render() {
    const { assignmentList } = this.props;
    return (
      <Route
        path={`/instructor`} //??
        exact
        render={() => (
          <div>
            {/* {assignmentHome} */}
            <button
              className="add-assButton"
              onClick={() => {
                const addAssForm = document.querySelector(".add-assForm");
                addAssForm.style.display = "block";
                const addAssButton = document.querySelector(".add-assButton");
                addAssButton.style.display = "none";
              }}
            >
              Add Assignment
            </button>
            <div className="add-assForm" style={{ display: "none" }}>
              <label>Name:</label>
              <input onChange={this.addAssignment} value={this.state.newName} />
              <label>Description:</label>
              <input
                onChange={this.addAssignment}
                value={this.state.newDescription}
              />
              <label>Requirements</label>
              <input
                onChange={this.addAssignment}
                value={this.state.newRequirements}
              />
              <label>Due Date</label>
              <input
                onChange={this.addAssignment}
                value={this.state.newDueDate}
              />
              <label>Type</label>
              <input onChange={this.addAssignment} value={this.state.newType} />

              <button onClick={this.submitClick}>Submit Assignment</button>
            </div>
          </div>
        )}
      />
    );
  }
}
