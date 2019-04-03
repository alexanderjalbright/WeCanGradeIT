import React, { Component } from 'react'

export default class Students extends Component {
    nameChange = e => {
        this.props.setNewName(e.target.value);
    }
  render() {
      const {roster, newName} = this.props;
      const rosterList = roster.map(student => (
          <h1>{student.name}</h1>
      ))
    return (
      <div>
        {rosterList}
        <button onClick={ () => { 
            const addForm = document.querySelector(".add-form");
            addForm.style.display = "block";
        }}>Add Student</button>
        <div className="add-form" style={{display:"none"}}><label>
            Name:</label><input onChange={this.nameChange} value={this.props.newName}></input></div>
      </div>
    )
  }
}
