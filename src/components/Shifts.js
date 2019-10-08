import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Shift from './Shift';

const baseAPI = `http://localhost:3000`;

class Shifts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shifts: [],
      sessionId: this.props.location.state.sessionId,
      user: this.props.location.state.user,
      users: []
    }
    // BINDING GOES HERE
    this.fetchShifts = this.fetchShifts.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  fetchShifts() {
    console.log('fetching shifts')
    if(this.props.location.state) {
      const { sessionId } = this.props.location.state
      this.setState({ sessionId })
      axios.get(baseAPI + `/shifts`, {
        headers: {
          'Authorization': this.state.sessionId
        }
      })
      .then(response => {
        console.log(response)
        this.setState({
          shifts: response.data
        })
        console.log('fetching users')
        return axios.get(baseAPI + `/users`, {
          headers: {
            'Authorization': this.state.sessionId
          }
        })
        .then(response => {
          console.log(response)
          this.setState({
            users: response.data
          })
        })
      })
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('adding shift')
    const { user: { id }} = this.state
    axios.post(baseAPI + `/shifts`, {
      userId: id,
      start: event.target.date.value + ' ' + event.target.start.value,
      finish: event.target.date.value + ' ' + event.target.finish.value,
      breakLength: event.target.break.value
    }, {
      headers: {
        'Authorization': this.props.location.state.sessionId
      }
    })
    .then(
      this.fetchShifts(),
    )
    console.log('shift added')
  }

  componentDidMount() {
    this.fetchShifts()
  }

  render() {
    return(
      <div className='container'>
        <div className='header'>
          <h1>
            <Link to={{
              pathname: '/home',
              state: {
                organisation: this.props.location.state.organisation,
                user: this.state.user,
                sessionId: this.state.sessionId
              }
            }}>
              Tanda Challenge
            </Link>
          </h1>
        </div>
        <div className='shifts'>
          <p>
            Logged in as {this.props.location.state.user.name}.
            <span>   </span>
            <button
              className='log-out'
              onClick={this.props.handleLogout}
              >
              Log out
            </button>
          </p>

          <h2>{this.props.location.state.organisation.name}</h2>

          <h4> Shifts </h4>
          <table border='1'>
            <thead>
              <tr>
                <th> Employee name </th>
                <th> Shift date </th>
                <th> Start time </th>
                <th> Finish time </th>
                <th> Break length (minutes) </th>
                <th> Hours worked </th>
                <th> Shift cost </th>
              </tr>
            </thead>
            <tbody>
            { this.state.shifts.map((shift, index) => {
              return(
                <Shift
                  key={index}
                  users={this.state.users}
                  shift={shift}
                  organisation={this.props.location.state.organisation}
                />
              )
            })}
            </tbody>
          </table>

          <h4> Add Shift </h4>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="date">
                Shift date:
              </label>
              <input
                type="date"
                name="date"
                id="date"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="start">
                Start time:
              </label>
              <input
                type="time"
                name="start"
                id="start"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="finish">
                Finish time:
              </label>
              <input
                type="time"
                name="finish"
                id="finish"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Break length (minutes)">
                Break length (minutes)
              </label>
              <input
                type="text"
                name="break"
                id="break"
                className="form-control"
              />
            </div>
            <button type="submit">
              Submit
            </button>
          </form>
          <Link to={{
            pathname: `/home`,
            state: {
              organisation: this.props.location.state.organisation,
              user: this.state.user,
              sessionId: this.state.sessionId }
            }}>
            Back
          </Link>
        </div>
      </div>
    )
  }
}

export default Shifts;
