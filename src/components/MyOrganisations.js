import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MyOrganisations extends Component {
  render() {
    return(
      <div className="my-organisations">
        <h3>
          {this.props.organisation.name}
        </h3>
        <Link to={{
          pathname: `/shifts`,
          state: {
            organisation: this.props.organisation,
            user: this.props.user,
            sessionId: this.props.sessionId
          }
        }}>
          View Shifts
        </Link>
        <span>  |  </span>
        <Link to={{
          pathname: `/edit`,
          state: {
            organisation: this.props.organisation,
            user: this.props.user,
            sessionId: this.props.sessionId }
          }}>
          Edit
        </Link>
        <span>  |  </span>
        <Link
          to='/home'
          onClick={this.props.handleLeave}
        >
          Leave
        </Link>
      </div>
    )
  }
}

export default MyOrganisations;
