import React, { Component } from 'react';
import parseMarkdown from '../parseMarkdown';

export default class Assignment extends Component {
  render() {
    const {assignmentId, name, type, description, requirements, dueDate} = this.props.assignment;

    const requirementsArray = parseMarkdown(requirements);

    const renderArrayToHTMLList = requirementsArray.map(req => <li key={req}>{req}</li>);

    const amPm = () => {
      if (dueDate.slice(11,13) > 12){
        return('PM');
      }else{
        return('AM');
      }
    }
    const militaryToStandardTime = () => {
        if (dueDate.slice(11, 13) > 12) {
          return (dueDate.slice(11,13) - 12);
        } else if (dueDate.slice(11, 13) > 9) {
          return (dueDate.slice(11, 13));
        } else {
          return (dueDate.slice(12,13))
        }
    }
    var day = (dueDate.slice(8, 9) >= 1) ? dueDate.slice(8, 10) : dueDate.slice(9, 10);
    var month = (dueDate.slice(5, 6) >= 1) ? dueDate.slice(5, 7) : dueDate.slice(6, 7);

    return (
      <div>
        <h1 style={{display:"inline"}}>{name}</h1>
        <small> ({type})</small>
        <p>{description}</p>
        <h2>Due: {month}/{day}/{dueDate.slice(0,4)} 
          <br></br>{militaryToStandardTime()}{dueDate.slice(13,16)} {amPm()}</h2>
        <ul>{renderArrayToHTMLList}</ul>
      </div>
    )
  }
}
