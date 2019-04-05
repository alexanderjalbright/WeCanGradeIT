import React, { Component } from "react";
import parseMarkdown from "../lib/parseMarkdown";
import { apiUrl } from "../lib/constants";

export default class Assignment extends Component {
  constructor() {
    super();
    this.state = {
      url: ""
    };
  }

  urlChange = event => {
    this.setState({ url: event.target.value });
  };

  submitUrl = () => {
    const { user, assignment } = this.props;
    const url = `${apiUrl}grade/${user.studentId}/${assignment.assignmentId}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(this.state.url)
    }).then(res => {
      if (res.ok) {
        alert(`Your assignment has been submitted: ${this.state.url}`);
      }
    });
  };

  render() {
    const {
      name,
      type,
      description,
      requirements,
      dueDate
    } = this.props.assignment;

    const requirementsArray = parseMarkdown(requirements);

    const renderArrayToHTMLList = requirementsArray.map(req => (
      <li key={req}>{req}</li>
    ));

    const amPm = () => {
      if (dueDate.slice(11, 13) > 12) {
        return "PM";
      } else {
        return "AM";
      }
    };
    const militaryToStandardTime = () => {
      if (dueDate.slice(11, 13) > 12) {
        return dueDate.slice(11, 13) - 12;
      } else if (dueDate.slice(11, 13) > 9) {
        return dueDate.slice(11, 13);
      } else {
        return dueDate.slice(12, 13);
      }
    };
    var day =
      dueDate.slice(8, 9) >= 1 ? dueDate.slice(8, 10) : dueDate.slice(9, 10);
    var month =
      dueDate.slice(5, 6) >= 1 ? dueDate.slice(5, 7) : dueDate.slice(6, 7);

    return (
      <div>
        <h1 style={{ display: "inline" }}>{name}</h1>
        <small> ({type})</small>
        <p>{description}</p>
        <h2>
          Due: {month}/{day}/{dueDate.slice(0, 4)}
          <br />
          {militaryToStandardTime()}
          {dueDate.slice(13, 16)} {amPm()}
        </h2>
        <ul>{renderArrayToHTMLList}</ul>
        <div className="submit-url">
          <label>URL:&nbsp;</label>
          <input onChange={this.urlChange} value={this.state.url} />
          <button onClick={this.submitUrl}>Submit URL</button>
        </div>
      </div>
    );
  }
}
