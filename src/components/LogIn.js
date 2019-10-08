import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const baseAPI = `http://localhost:3000`;

class LogIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loginError: ''
    }
    // BINDING GOES HERE
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post(baseAPI + `/auth/login`, {
      email: event.target.email.value,
      password: event.target.password.value
    })
    .then(response => {
      if(response) {
        this.props.history.push({
          pathname: "/home",
          state: {
            data: response.config.data,
            sessionId: response.data.sessionId
          }
        })
      }
      console.log('user logged in!')
    })
    .catch(err => {
      console.log(err)
      this.setState({
        loginError: 'Incorrect email or password.'
      })
    })
  }


  render() {
    return(
      <div className="container">
        <div className='header'>
          <h1>
            <Link to='/home'>
              Tanda Challenge
            </Link>
          </h1>
        </div>
        <div className="log-in">
          <h2> Log-In </h2>
          <h5>{this.state.loginError}</h5>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="id"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
              />
            </div>
            <button type="submit"> Log In </button>
          </form>
          <Link to='/signup'>
            Sign Up
          </Link>
        </div>
      </div>
    )
  }
}

export default LogIn;
