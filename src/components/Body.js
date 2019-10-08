import React, { Component } from 'react';

class Body extends Component {
  render() {
    return(
      <div className='body'>
        <h2> Home </h2>
        <p>
          Logged in as {this.props.user.name}.
          <span>   </span>
          <button
            className='log-out'
            onClick={this.props.handleLogout}
          >
            Log out
          </button>
        </p>
        { this.props.user.organisationId === null
          ?
          <p>
            You aren't a member of any organisations.
            <br />
            Join an exisiting one or create a new one.
          </p>
          : ''
        }
      </div>
    )
  }
}

export default Body;
