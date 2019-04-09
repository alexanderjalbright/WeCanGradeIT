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
      dueDate: "",
      type: ""
    };
  }

  submitNewAssignment = () => {
    const newAssignment = {
      name: this.state.name,
      description: this.state.description,
      requirements: this.state.requirements,
      dueDate: this.state.dueDate,
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
        this.props.addAssignment(newAssignment);
        const addAssForm = document.querySelector(".add-assForm");
        addAssForm.style.display = "none";
        const addAssButton = document.querySelector(".add-assButton");
        addAssButton.style.display = "block";
      }
    });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitClick = () => {
    this.submitNewAssignment(
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
                  name="name"
                  onChange={this.onChange}
                  value={this.state.name}
                />
              </div>
              <div className="add-assType">
                <label>Type:&nbsp;</label>
                <select name="type" onChange={this.onChange} id="selType">
                  <option value="" />
                  <option value="Individual">Individual</option>
                  <option value="Team">Team</option>
                </select>
              </div>
              <div className="add-assDescription">
                <label>Description:&nbsp;</label>
                <textarea
                  name="description"
                  onChange={this.onChange}
                  value={this.state.description}
                />
              </div>
              <div className="add-assRequirements">
                <label>Requirements:&nbsp;</label>
                <input
                  name="requirements"
                  onChange={this.onChange}
                  value={this.state.requirements}
                />
              </div>
              <div className="add-assDueDate">
                <label>Due Date:&nbsp;</label>
                <input
                  type="datetime-local"
                  name="dueDate"
                  onChange={this.onChange}
                  value={this.state.dueDate}
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
