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

  nameChange = event => {
    this.setState({ name: event.target.value });
  };

  typeChange = event => {
    this.setState({ type: event.target.value });
  };

  descriptionChange = event => {
    this.setState({ description: event.target.value });
  };

  requirementsChange = event => {
    this.setState({ requirements: event.target.value });
  };

  dueDateChange = event => {
    this.setState({ dueDate: event.target.value });
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
                <input onChange={this.nameChange} value={this.state.name} />
              </div>
              <div className="add-assType">
                <label>Type:&nbsp;</label>
                <select onChange={this.typeChange} id="selType">
                  <option value="" />
                  <option value="Individual">Individual</option>
                  <option value="Team">Team</option>
                </select>
              </div>
              <div className="add-assDescription">
                <label>Description:&nbsp;</label>
                <input
                  onChange={this.descriptionChange}
                  value={this.state.description}
                />
              </div>
              <div className="add-assRequirements">
                <label>Requirements:&nbsp;</label>
                <input
                  onChange={this.requirementsChange}
                  value={this.state.requirements}
                />
              </div>
              <div className="add-assDueDate">
                <label>Due Date:&nbsp;</label>
                <input
                  onChange={this.dueDateChange}
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
