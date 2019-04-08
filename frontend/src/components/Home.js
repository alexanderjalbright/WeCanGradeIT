import React, { Component } from "react";

export default class Home extends Component {
  constructor() {
    super();
    this.state = { selectedUserId: null };
  }
  setUserClick = student => {
    this.props.setUser(student);
  };

  selectClick = () => {
    this.props.history.push(`/student/${this.state.selectedUserId}`);
  };

  pickUser = event => {
    this.setState({ selectedUserId: event.target.value });
  };

  render() {
    const { students, user } = this.props;
    const selectUserLinks = students.map(student => (
      <option key={student.studentId} value={student.studentId}>
        {student.name}
      </option>
    ));
    return (
      <div className="login">
        <h2>Select User</h2>
        <select onChange={this.pickUser} className="user-select">
          <option />
          {selectUserLinks}
        </select>
        <button className="user-select-btn" onClick={this.selectClick}>
          Select
        </button>
      </div>
    );
  }
}
