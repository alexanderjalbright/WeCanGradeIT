import React, { Component } from 'react'

export default class Students extends Component {
  render() {
      const {roster} = this.props;
      const rosterList = roster.map(student => (
          <h1>{student.name}</h1>
      ))
    return (
      <div>
        {rosterList}
      </div>
    )
  }
}
