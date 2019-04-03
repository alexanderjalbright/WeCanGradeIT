import React, { Component } from 'react'

export default class Students extends Component {
    nameChange = e => {
        this.props.setNewName(e.target.value);
    }

    userNameChange = e => {
        this.props.setNewUserName(e.target.value);
    }

    submitClick = () => {
        this.props.submitNewStudent();
    }
    
  render() {
      const {roster, newName, newUserName} = this.props;
      const rosterList = roster.map(student => (
          <h1>{student.name}</h1>
      ))
    return (
      <div>
        {rosterList}
        <button className="add-button" onClick={ () => { 
            const addForm = document.querySelector(".add-form");
            addForm.style.display = "block";
            const addButton = document.querySelector(".add-button");
            addButton.style.display = "none";
        }}>Add Student</button>
        <div className="add-form" style={{display:"none"}}>
        <label>Name:</label>
        <input onChange={this.nameChange} value={newName}/>
        <label>Username:</label>
        <input onChange={this.userNameChange} value={newUserName}/>
        <button onClick={this.submitClick}>Submit Student</button>
        </div>
      </div>
    )
  }
}
