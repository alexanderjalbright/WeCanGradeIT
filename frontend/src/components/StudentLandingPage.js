import React, { Component } from "react";

class StudentLandingPage extends Component {
  constructor() {
    super();
    this.state = {
      student: null
    };
  }
  componentDidMount() {
    console.log("students id: ", this.props.match.params.id);
    // fetch the student details, and jam them into local state
  }
  render() {
    return <div>Hello world!</div>;
  }
}

export default StudentLandingPage;
