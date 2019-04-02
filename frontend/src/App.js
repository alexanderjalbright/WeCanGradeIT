import React, { Component } from "react";
import Assignment from "./components/Assignment";
import "./App.css";


class App extends Component {
  constructor() {
    super();
    this.state = {
      assignments: []
    }
  }
  componentDidMount() {
    fetch("https://localhost:44397/api/assignment")
    .then(res => res.json())
    .then(json => this.setState({ assignments: json}));
  }

  render() {
    const parseAssignments = this.state.assignments.map(assignment => (
      <Assignment key={assignment.assignmentId} 
        assignment={assignment}/>
    ) )
    return (
      <div className="App">
        {parseAssignments}
      </div>
      
    );
  }
}

export default App;
