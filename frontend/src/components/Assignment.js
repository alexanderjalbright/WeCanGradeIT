import React, { Component } from 'react';
import parseMarkdown from '../parseMarkdown';

export default class Assignment extends Component {
  render() {
    const {assignmentId, name, type, description, requirements, dueDate} = this.props.assignment;

    const requirementsArray = parseMarkdown(requirements);

    const renderArrayToHTMLList = requirementsArray.map(req => <li key={req}>{req}</li>);

    return (
      <div>
        <h1>{name}</h1>
        <p>{description}</p>
        <h2>{type}</h2>
        <h2>Due: {dueDate}</h2>
        <ul>{renderArrayToHTMLList}</ul>
      </div>
    )
  }
}
