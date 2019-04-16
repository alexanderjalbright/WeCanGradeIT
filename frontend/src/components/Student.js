import React, { Component } from "react";
import { Route } from "react-router-dom";
import { gitHubApi } from "../lib/constants";

export default class Student extends Component {
  constructor() {
    super();
    this.state = {
      info: {}
    };
  }

  //   getImage() {
  //     const { user } = this.props;
  //     fetch(`${gitHubApi}/users/${user.userName}`)
  //       .then(res => res.json())
  //       .then(json => this.setState({ avatar_url: json }))
  //       .then(console.log("howdy: " + this.state.avatar_url));
  //   }

  componentDidMount() {
    const { user } = this.props;
    fetch("https://api.github.com/users/alexanderjalbright")
      .then(res => res.json())
      .then(json => this.setState({ info: json }))
      .then(console.log("howdy: " + this.state.info.avatar_url));
  }

  render() {
    const { user } = this.props;
    // this.getImage();
    return (
      <Route
        path={`/${user.userName}`}
        exact
        render={() => (
          <div>
            {" "}
            <h1>{user.userName}</h1>
            {/* <h1>`${this.state.avatar_url}`</h1> */}
            <img
              src={`${this.state.info.avatar_url}`}
              style={{ width: "200px", margin: "1em 0" }}
            />
          </div>
        )}
      />
    );
  }
}
