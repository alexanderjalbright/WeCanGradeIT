import React, { Component } from "react";
import parseMarkdown from "../lib/parseMarkdown";
import { apiUrl, gitHubApi } from "../lib/constants";
import assignment from "../components/Assignment.css";

export default class Assignment extends Component {
  constructor() {
    super();
    this.state = {
      url: "",
      repos: [{}],
      repo: "",
      branches: [{}],
      branch: "",
      editName: "",
      editType: "",
      editDescription: "",
      editRequirements: "",
      editDueDate: "",
      editDueTime: ""
    };
  }

  componentDidMount() {
    const { user } = this.props;
    fetch(`${gitHubApi}/users/${user.userName}/repos?sort=date`)
      .then(res => res.json())
      .then(json => this.setState({ repos: json }));
  }

  getBranches = repo => {
    const { user } = this.props;
    fetch(`${gitHubApi}/repos/${user.userName}/${repo}/branches`)
      .then(res => res.json())
      .then(json => this.setState({ branches: json }));
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  repoChange = event => {
    this.setState({ repo: event.target.value });
    this.getBranches(event.target.value);
  };

  submitBranch = () => {
    const { user, assignment } = this.props;
    let branchUrl = `https://github.com/${user.userName}/${this.state.repo}`;
    if (this.state.branch !== "") {
      branchUrl = `${branchUrl}/tree/${this.state.branch}`;
    }
    const grade = {
      repoUrl: branchUrl,
      repoName: this.state.repo,
      branchName: this.state.branch
    };
    this.setState({ url: branchUrl });
    const url = `${apiUrl}/grade/${user.studentId}/${assignment.assignmentId}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(grade)
    }).then(res => {
      if (res.ok) {
        alert(`Your assignment has been submitted: ${branchUrl}`);
      }
    });
  };

  submitUrl = () => {
    const { user, assignment } = this.props;
    const grade = { repoUrl: this.state.url };
    const url = `${apiUrl}/grade/${user.studentId}/${assignment.assignmentId}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(grade)
    }).then(res => {
      if (res.ok) {
        alert(`Your assignment has been submitted: ${this.state.url}`);
      }
    });
  };

  submitAssignment = () => {
    const editAssignment = {
      name: this.state.editName,
      type: this.state.editType,
      description: this.state.editDescription,
      requirements: this.state.editRequirements,
      dueDate: this.state.editDueDate + "T" + this.state.editDueTime,
      assignmentId: this.props.assignment.assignmentId
    };
    fetch(`${apiUrl}/assignment/${this.props.assignment.assignmentId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(editAssignment)
    }).then(res => {
      if (res.ok) {
        this.props.editAssignment();
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

    const repoSelection = this.state.repos.map(repo => (
      <option>{repo.name}</option>
    ));

    const branchSelection = this.state.branches.map(branch => (
      <option>{branch.name}</option>
    ));

    const studentOrInstructor = () =>
      this.props.user.firstName === "Instructor" ? (
        <div>
          <button
            className="edit-assignment-button"
            onClick={() => {
              const addAssignmentForm = document.querySelector(
                ".edit-assignment-form"
              );
              addAssignmentForm.style.display = "block";
              const addAssignmentButton = document.querySelector(
                ".edit-assignment-button"
              );
              addAssignmentButton.style.display = "none";
              this.setState({
                editName: name,
                editType: type,
                editDescription: description,
                editRequirements: requirements,
                editDueDate: dueDate.slice(0, 10),
                editDueTime: dueDate.slice(11, 16)
              });
            }}
          >
            Edit Assignment
          </button>
          <div
            className="edit-assignment-form assignment-form"
            style={{ display: "none" }}
          >
            <div className="edit-assignment-name">
              <label>Name:&nbsp;</label>
              <input
                name="editName"
                onChange={this.onChange}
                value={this.state.editName}
              />
            </div>
            <div className="edit-assignment-type">
              <label>Type:&nbsp;</label>
              <select
                name="editType"
                onChange={this.onChange}
                id="selType"
                value={this.state.editType}
              >
                <option value="Individual">Individual</option>
                <option value="Team">Team</option>
              </select>
            </div>
            <div className="edit-assignment-description">
              <label>Description:&nbsp;</label>
              <input
                name="editDescription"
                onChange={this.onChange}
                value={this.state.editDescription}
              />
            </div>
            <div className="edit-assignment-requirements">
              <label>Requirements:&nbsp;</label>
              <input
                name="editRequirements"
                onChange={this.onChange}
                value={this.state.editRequirements}
              />
            </div>
            <div className="edit-assignment-due-date">
              <label>Due Date:&nbsp;</label>
              <input
                type="date"
                name="editDueDate"
                onChange={this.onChange}
                value={this.state.editDueDate}
              />
              <input
                type="time"
                name="editDueTime"
                onChange={this.onChange}
                value={this.state.editDueTime}
              />
            </div>
            <button onClick={this.submitAssignment}>Submit Assignment</button>
          </div>
        </div>
      ) : (
        <div className="assignment-form">
          <div className="submit-url">
            <label>URL&nbsp;</label>
            <input
              name="url"
              onChange={this.onChange}
              value={this.state.url}
              placeholder="https://alexalbright.dev"
            />
            <button onClick={this.submitUrl}>Submit URL</button>
          </div>
          <div className="repo-selection">
            <label>Repo&nbsp;</label>
            <select onChange={this.repoChange} className="repo-select">
              <option value="" selected disabled hidden>
                Choose here
              </option>
              {repoSelection}
            </select>
          </div>
          <div>
            <label>Branch&nbsp;</label>
            <select
              name="branch"
              onChange={this.onChange}
              className="branch-select"
            >
              <option value="" selected disabled hidden>
                Choose here
              </option>
              {branchSelection}
            </select>
            <button onClick={this.submitBranch}>Submit Repo/Branch</button>
          </div>
        </div>
      );

    return (
      <div className="assignment-page">
        <div className="assignment">
          <h1 style={{ display: "inline" }}>{name}</h1>
          <small> ({type})</small>
          <p>{description}</p>
          <h3>Requirements</h3>
          <ul>{renderArrayToHTMLList}</ul>
          <h3>
            Due: {month}/{day}/{dueDate.slice(0, 4)} &nbsp;
            {militaryToStandardTime()}
            {dueDate.slice(13, 16)} {amPm()}
          </h3>
        </div>
        {studentOrInstructor()}
      </div>
    );
  }
}
