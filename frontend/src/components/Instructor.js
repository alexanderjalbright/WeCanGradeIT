import React, { Component } from "react";
import { Route } from "react-router-dom";
import { apiUrl } from "../lib/constants";

export default class Instructor extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      requirements: "",
      requirementsList: [],
      dueDate: "",
      type: "",
      dueTime: ""
    };
  }

  submitNewAssignment = () => {
    const newAssignment = {
      name: this.state.name,
      description: this.state.description,
      requirements: this.state.requirements,
      dueDate: this.state.dueDate + "T" + this.state.dueTime,
      type: this.state.type
    };
    console.log(newAssignment.dueDate);
    fetch(`${apiUrl}/assignment`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(newAssignment)
    }).then(res => {
      if (res.ok) {
        this.props.addAssignment(newAssignment);
        const addAssignmentForm = document.querySelector(".add-assignmentForm");
        addAssignmentForm.style.display = "none";
        const addAssignmentButton = document.querySelector(
          ".add-assignmentButton"
        );
        addAssignmentButton.style.display = "block";
      }
    });
  };

  arrayToMDString = arr => {
    let str = "";
    arr.forEach(each => (str += "* " + each + "  "));
    return str;
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <Route
        path={`/instructor`}
        exact
        render={() => (
          <div>
            <button
              className="add-assignmentButton"
              onClick={() => {
                const addAssignmentForm = document.querySelector(
                  ".add-assignmentForm"
                );
                addAssignmentForm.style.display = "block";
                const addAssignmentButton = document.querySelector(
                  ".add-assignmentButton"
                );
                addAssignmentButton.style.display = "none";
              }}
            >
              Add Assignment
            </button>
            <div className="add-assignmentForm" style={{ display: "none" }}>
              <div className="add-assignmentName">
                <label>Name:&nbsp;</label>
                <input
                  name="name"
                  onChange={this.onChange}
                  value={this.state.name}
                />
              </div>
              <div className="add-assignmentType">
                <label>Type:&nbsp;</label>
                <select name="type" onChange={this.onChange} id="selType">
                  <option value="" />
                  <option value="Individual">Individual</option>
                  <option value="Team">Team</option>
                </select>
              </div>
              <div className="add-assignmentDescription">
                <label>Description:&nbsp;</label>
                <textarea
                  name="description"
                  onChange={this.onChange}
                  value={this.state.description}
                />
              </div>
              <div className="add-assignmentRequirements">
                <label>Requirements:&nbsp;</label>
                <input
                  name="requirementsList"
                  onChange={this.onChange}
                  value={this.state.requirementsList[0]}
                />
                <label>Requirements:&nbsp;</label>
                <input
                  name="requirementsList"
                  onChange={this.onChange}
                  value={this.state.requirementsList[1]}
                />
              </div>
              <div className="add-assignmentDueDate">
                <label>Due Date:&nbsp;</label>
                <input
                  type="date"
                  name="dueDate"
                  onChange={this.onChange}
                  value={this.state.dueDate}
                />
                <input
                  type="time"
                  name="dueTime"
                  onChange={this.onChange}
                  value={this.state.dueTime}
                />
              </div>
              <button onClick={this.submitNewAssignment}>
                Submit Assignment
              </button>
            </div>
          </div>
        )}
      />
    );
  }
}
