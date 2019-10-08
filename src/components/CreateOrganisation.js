import React, { Component } from 'react';

class CreateOrganisation extends Component {
  render() {
    return(
      <div className='create-organisation'>
        <h3> Create organisation </h3>
        <form onSubmit={this.props.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
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
              className="form-control"
            />
          </div>
          <br />
          <button type="submit"> Create and Join </button>
        </form>
      </div>
    )
  }
}

export default CreateOrganisation;
