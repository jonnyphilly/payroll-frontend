import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const baseAPI = `http://localhost:3000`;

class EditOrganisation extends Component {
  constructor(props) {
    super(props)
    // BINDING GOES HERE
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('updating organisation')
    const { organisation, sessionId } = this.props.location.state
    const headers = {
      'Authorization': sessionId
    }
    axios.put(baseAPI + `/organisations/` + organisation.id, {
      name: event.target.name.value,
      hourlyRate: event.target.rate.value
    },
    { headers })
    .then(response => {
      if(response) {
        console.log(response)
        this.props.history.push({
          pathname: "/home",
          state: {
            data: response.config.data,
            sessionId: response.config.headers.Authorization
          }
        })
      }
      console.log('organisation updated!')
    })
  }

  render() {
    return(
      <div className='container'>
        <div className='header'>
          <h1>
          <Link to={{
            pathname: `/home`,
            state: {
              organisation: this.props.location.state.organisation,
              user: this.props.location.state.user,
              sessionId: this.props.location.state.sessionId }
            }}>
              Tanda Challenge
            </Link>
          </h1>
        </div>
        <div className='edit-organisation'>
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
          <h3> Edit Organisation </h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">
                Name:
              </label>
              <input
                type="text"
                name="name"
                defaultValue={this.props.location.state.organisation.name}
                class="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="rate">
                Hourly rate: $ per hour
              </label>
              <input
                type="text"
                name="rate"
                id="rate"
                defaultValue={this.props.location.state.organisation.hourlyRate}
                class="form-control"
              />
            </div>
            <button type="submit"> Update </button>
          </form>
          <Link to={{
            pathname: `/home`,
            state: {
              organisation: this.props.location.state.organisation,
              user: this.props.location.state.user,
              sessionId: this.props.location.state.sessionId }
            }}>
            Back
          </Link>
        </div>
      </div>
    )
  }
}

export default EditOrganisation;
