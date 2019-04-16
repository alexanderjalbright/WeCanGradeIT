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

  getImage() {
    const { user } = this.props;
    fetch(`${gitHubApi}/users/${user.userName}`)
      .then(res => res.json())
      .then(json => this.setState({ info: json }));
  }

  render() {
    const { user } = this.props;
    return (
      <Route
        path={`/${user.userName}`}
        exact
        component={() => (
          <div>
            {" "}
            <h1>{user.userName}</h1>
            {this.state.info.login === user.userName || this.getImage()}
            <img
              src={this.state.info.avatar_url}
              style={{ width: "200px", margin: "1em 0" }}
            />
          </div>
        )}
      />
    );
  }
}
