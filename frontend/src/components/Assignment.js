import React, { Component } from "react";
import parseMarkdown from "../lib/parseMarkdown";
import { apiUrl, gitHubApi } from "../lib/constants";

export default class Assignment extends Component {
  constructor() {
    super();
    this.state = {
      url: "",
      repos: [{}],
      repo: "",
      branches: [{}],
      branch: ""
    };
  }

  componentDidMount() {
    const { user } = this.props;
    fetch(`${gitHubApi}/users/${user.userName}/repos?sort=date`)
      .then(res => res.json())
      .then(json => this.setState({ repos: json }));
  }

  urlChange = event => {
    this.setState({ url: event.target.value });
  };

  getBranches = repo => {
    const { user } = this.props;
    fetch(`${gitHubApi}/repos/${user.userName}/${repo}/branches`)
      .then(res => res.json())
      .then(json => this.setState({ branches: json }));
  };

  submitRepo = () => {
    const repoName = document.querySelector(".repo-select").value;
    if (repoName !== "") {
      const repoUrl = `https://github.com/${
        this.props.user.userName
      }/${repoName}/`;
      this.setState({ url: repoUrl, repo: repoName });
      this.submitUrl();
      this.getBranches(repoName);
    }
  };

  submitBranch = () => {
    const branchName = document.querySelector(".branch-select").value;
    const { user } = this.props;
    if (branchName !== "") {
      const branchUrl = `https://github.com/${user.userName}/${
        this.state.repo
      }/tree/${branchName}`;
      this.setState({ url: branchUrl, branch: branchName });
      this.submitUrl();
    }
  };

  submitUrl = () => {
    const { user, assignment } = this.props;
    const url = `${apiUrl}/grade/${user.studentId}/${assignment.assignmentId}`;
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

    const userUrl = this.props.user.grades.forEach(grade => {
      if (grade.repoUrl !== null) {
        return <h2>Submitted:{grade.repoUrl}</h2>;
      } else {
        console.log("nope");
      }
    });

    const repoSelection = this.state.repos.map(repo => (
      <option>{repo.name}</option>
    ));

    const branchSelection = this.state.branches.map(branch => (
      <option>{branch.name}</option>
    ));

    return (
      <div>
        <h1 style={{ display: "inline" }}>{name}</h1>
        <small> ({type})</small>
        <p>{description}</p>
        <h3>Requirements</h3>
        <ul>{renderArrayToHTMLList}</ul>
        <h3>
          Due: {month}/{day}/{dueDate.slice(0, 4)}
          <br />
          {militaryToStandardTime()}
          {dueDate.slice(13, 16)} {amPm()}
        </h3>
        {userUrl}
        <div className="submit-url">
          <label>URL:&nbsp;</label>
          <input onChange={this.urlChange} value={this.state.url} />
          <button onClick={this.submitUrl}>Submit URL</button>
        </div>
        <div>
          <label>Repo:&nbsp;</label>
          <select className="repo-select">{repoSelection}</select>
          <button onClick={this.submitRepo}>Submit Repo</button>
        </div>
        <div>
          <label>Branch:&nbsp;</label>
          <select className="branch-select">{branchSelection}</select>
          <button onClick={this.submitBranch}>Submit Branch</button>
        </div>
      </div>
    );
  }
}
