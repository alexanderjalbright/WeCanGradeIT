import React, { Component } from "react";
import { Route } from "react-router-dom";
import { apiUrl } from "../lib/constants";
import instructor from "../components/Instructor.css";

export default class Instructor extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      requirements: "",
      dueDate: "",
      type: "",
      dueTime: "",
      requirementsList: []
    };
  }

  arrayToMDString = arr => {
    let str = "";
    arr.forEach(each => (str += "* " + each + "  "));
    return str;
  };

  removeReq = removeThis => {
    let arr = this.state.requirementsList;
    arr.splice(removeThis, 1);
    this.setState({ requirementsList: arr });
  };

  submitNewAssignment = () => {
    const str = this.arrayToMDString(this.state.requirementsList);
    const newAssignment = {
      name: this.state.name,
      description: this.state.description,
      requirements: str,
      dueDate: this.state.dueDate + "T" + this.state.dueTime,
      type: this.state.type
    };
    fetch(`${apiUrl}/assignment`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(newAssignment)
    }).then(res => {
      if (res.ok) {
        this.props.addAssignment();
        const addAssignmentForm = document.querySelector(
          ".add-assignment-form"
        );
        addAssignmentForm.style.display = "none";
        const addAssignmentButton = document.querySelector(
          ".add-assignment-button"
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
    if (event.target.name === "requirements") {
      console.log("Hello! yo yo");
    }
    this.setState({ [event.target.name]: event.target.value });
  };

  addRequirement = () => {
    this.state.requirementsList.push(this.state.requirements);
    this.setState({ requirements: "" });
  };

  render() {
    const renderArrayToHTMLListWithX = this.state.requirementsList.map(
      (req, index) => (
        <li key={req}>
          {req} <button onClick={() => this.removeReq(index)}>&times;</button>
        </li>
      )
    );

    return (
      <Route
        path={`/instructor`}
        exact
        render={() => (
          <div>
            <button
              className="add-assignment-button fancy-btn"
              onClick={() => {
                const addAssignmentForm = document.querySelector(
                  ".add-assignment-form"
                );
                addAssignmentForm.style.display = "block";
                const addAssignmentButton = document.querySelector(
                  ".add-assignment-button"
                );
                addAssignmentButton.style.display = "none";
              }}
            >
              Add Assignment
            </button>
            <div className="add-assignment-form" style={{ display: "none" }}>
              <div className="add-assignment-name">
                <label>Name&nbsp;</label>
                <input
                  name="name"
                  onChange={this.onChange}
                  value={this.state.name}
                />
              </div>
              <div className="add-assignment-type">
                <label>Type&nbsp;</label>
                <select name="type" onChange={this.onChange} id="selType">
                  <option value="" />
                  <option value="Individual">Individual</option>
                  <option value="Team">Team</option>
                </select>
              </div>
              <div className="add-assignment-description">
                <label>Description&nbsp;</label>
                <textarea
                  className="description"
                  name="description"
                  onChange={this.onChange}
                  value={this.state.description}
                />
              </div>
              <div className="add-assignment-requirements">
                <label>Requirements&nbsp;</label>
                {this.state.requirementsList.length > 0 && (
                  <ul>{renderArrayToHTMLListWithX}</ul>
                )}
                <input
                  placeholder="&#9679; new requirement"
                  name="requirements"
                  onChange={this.onChange}
                  value={this.state.requirements}
                />
                <button
                  className="fancy-btn small-btn"
                  onClick={this.addRequirement}
                >
                  Add Requirement
                </button>
              </div>
              <div className="add-assignment-due-date">
                <label>Due Date&nbsp;</label>
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
              <button
                className="fancy-btn small-btn"
                onClick={this.submitNewAssignment}
              >
                Submit Assignment
              </button>
            </div>
          </div>
        )}
      />
    );
  }
}
