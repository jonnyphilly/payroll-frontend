import React, { Component } from 'react';

class Shift extends Component {

  render() {
    const userLine = this.props.users.find(user => user.id === this.props.shift.userId)
    const start = new Date(this.props.shift.start)
    const finish = new Date(this.props.shift.finish)
    const hour = 1000 * 60 * 60
    const time = ((finish.getTime() - (start.getTime()) - (this.props.shift.breakLength * 1000 * 60))) / hour
    return(
      <tr key={this.props.shift.index}>
        <td> {userLine ? userLine.name : ''} </td>
        <td> {this.props.shift.start} </td>
        <td> {this.props.shift.start.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} </td>
        <td> {this.props.shift.finish.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} </td>
        <td> {this.props.shift.breakLength} </td>
        <td> {time} </td>
        <td> {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(time * this.props.organisation.hourlyRate)}</td>
      </tr>
    )
  }
}

export default Shift;
