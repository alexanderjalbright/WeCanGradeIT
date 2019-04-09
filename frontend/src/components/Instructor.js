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
    fetch(`instructor/assignment`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(newAssignment)
    }).then(res => {
      if (res.ok) {
        const newAssignment = [...this.state.assignments, newAssignment];
        this.setState({ assignments: newAssignment });
        const addAssForm = document.querySelector(".add-assForm");
        addAssForm.style.display = "none";
        const addAssButton = document.querySelector(".add-assButton");
        addAssButton.style.display = "block";
      }
    });
  };

  addAssignment = event => {
    this.setState({ newAssignment: event.target.value });
  };

  submitClick = () => {
    this.state.submitNewAssignment(
      this.state.newName,
      this.state.newDescription,
      this.state.newRequirements,
      this.state.newDueDate,
      this.state.newType
    );
    this.setState({
      newName: "",
      newDescription: "",
      newRequirements: "",
      newDueDate: "",
      newType: ""
    });
  };

  render() {
    // const { assignmentList } = this.props;
    return (
      <Route
        path={`/instructor`}
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
              <div className="add-assName">
                <label>Name:&nbsp;</label>
                <input
                  onChange={this.addAssignment}
                  value={this.state.newName}
                />
              </div>
              <div className="add-assType">
                <label>Type:&nbsp;</label>
                <select id="selType">
                  <option value="" />
                  <option value="Individual">Individual</option>
                  <option value="Team">Team</option>
                  <input
                    onChange={this.addAssignment}
                    value={this.state.newType}
                  />
                </select>
              </div>
              <div className="add-assDescription">
                <label>Description:&nbsp;</label>
                <input
                  onChange={this.addAssignment}
                  value={this.state.newDescription}
                />
              </div>
              <div className="add-assRequirements">
                <label>Requirements:&nbsp;</label>
                <input
                  onChange={this.addAssignment}
                  value={this.state.newRequirements}
                />
              </div>
              <div className="add-assDueDate">
                <label>Due Date:&nbsp;</label>
                <input
                  onChange={this.addAssignment}
                  value={this.state.newDueDate}
                />
              </div>
              <button onClick={this.submitClick}>Submit Assignment</button>
            </div>
          </div>
        )}
      />
    );
  }
}
