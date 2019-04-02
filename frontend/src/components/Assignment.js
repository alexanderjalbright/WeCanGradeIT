import React, { Component } from 'react';

export default class Assignment extends Component {
  render() {
      const {assignmentId, name, type, description, requirements, dueDate} = this.props.assignment;
    return (
      <div>
        <h1>{name}</h1>
        <p>{description}</p>
        <h2>{type}</h2>
        <h2>Due: {dueDate}</h2>
        <h2>{requirements}</h2>
      </div>
    )
  }
}
