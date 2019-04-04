import React, { Component } from "react";

export default class Students extends Component {
  constructor() {
    super();
    this.state = {
      newName: "",
      newUserName: ""
    };
  }
  nameChange = e => {
    this.setState({ newName: e.target.value });
  };

  userNameChange = e => {
    this.setState({ newUserName: e.target.value });
  };

  submitClick = () => {
    this.props.submitNewStudent(this.state.newName, this.state.newUserName);
    this.setState({ newName: "", newUserName: "" });
  };

  render() {
    const { roster } = this.props;
    const rosterList = roster.map(student => (
      <h1>{student.name === "Instructor" ? "" : student.name}</h1>
    ));
    return (
      <div>
        {rosterList}
        <button
          className="add-button"
          onClick={() => {
            const addForm = document.querySelector(".add-form");
            addForm.style.display = "block";
            const addButton = document.querySelector(".add-button");
            addButton.style.display = "none";
          }}
        >
          Add Student
        </button>
        <div className="add-form" style={{ display: "none" }}>
          <label>Name:</label>
          <input onChange={this.nameChange} value={this.state.newName} />
          <label>Username:</label>
          <input
            onChange={this.userNameChange}
            value={this.state.newUserName}
          />
          <button onClick={this.submitClick}>Submit Student</button>
        </div>
      </div>
    );
  }
}