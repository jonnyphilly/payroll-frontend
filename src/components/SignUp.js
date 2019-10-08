import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const baseAPI = `http://localhost:3000`;

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userCreateMessage: ''
    }
    // BINDING GOES HERE
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('create user')
    const {
      target: {
        name,
        email,
        password,
        confirmpassword
      }
    } = event
    axios.post(baseAPI + `/auth/signup`, {
      name: name.value,
      email: email.value,
      password: password.value,
      passwordConfirmation: confirmpassword.value
    })
    .then(response => {
      if(response) {
        this.props.history.push({
          pathname: "/",
        })
      }
      alert("User created successfully! Please log-in.")
      console.log('user created!')
    })
    .catch(err => {
      console.log(err)
      this.setState({
        userCreateMessage: 'Error! User not created.'
      })
    })
  }

  render() {
    return(
      <div className='container'>
        <div className='header'>
          <h1>
            <Link to='/home'>
              Tanda Challenge
            </Link>
          </h1>
        </div>
        <div className="sign-up">
          <h2> Sign Up </h2>
          <h5>{this.state.userCreateMessage}</h5>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">
              Name
            </label>
            <br />
            <input
              type="text"
              name="name"
              id="name"
            />
            <br />
            <label htmlFor="email">
              Email
            </label>
            <br />
            <input
              type="email"
              name="email"
              id="email"
            />
            <br />
            <label htmlFor="password">
              Password
              <br />
              <i> (6 characters minimum) </i>
            </label>
            <br />
            <input
              type="password"
              name="password"
              id="password"
            />
            <br />
            <label htmlFor="confirmPassword">
              Confirm Password
            </label>
            <br />
            <input
              type="password"
              name="confirmpassword"
              id="confirmpassword"
            />
            <br />
            <button type="submit">
              Sign Up
            </button>
          </form>
          <Link to="/">
            Log In
          </Link>
        </div>
      </div>
    )
  }
}

export default SignUp;
