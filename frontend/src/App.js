import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import React, { Component } from "react";
import Assignment from "./components/Assignment";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      assignments: []
    };
  }
  componentDidMount() {
    fetch("https://localhost:44397/api/assignment")
      .then(res => res.json())
      .then(json => this.setState({ assignments: json }));
  }

  render() {
    const parseAssignments = this.state.assignments.map(assignment => (
      <Route
        path={`/assignment/${assignment.assignmentId}`}
        exact={true}
        component={() => (
          <Assignment key={assignment.assignmentId} assignment={assignment} />
        )}
      />
    ));
    const assignLinks = this.state.assignments.map(assignment => (
      <Link to={`/assignment/${assignment.assignmentId}`}>
        {assignment.name}
      </Link>
    ));
    return (
      <Router>
        <nav>{assignLinks}</nav>
        <div className="App">{parseAssignments}</div>
      </Router>
    );
  }
}

export default App;
