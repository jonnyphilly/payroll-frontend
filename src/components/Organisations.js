import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const baseAPI = `http://localhost:3000`;

class Organisations extends Component {
  constructor(props) {
    super(props)
    // BINDING GOES HERE
    this.handleJoin = this.handleJoin.bind(this)
  }

  handleJoin(organisationId) {
    console.log(organisationId)
    console.log('joining organisation')
    axios.post(baseAPI + `/organisations/join`, { organisationId }, {
      headers: {
        'Authorization': this.props.sessionId
      }
    })
    .then(response => {
      console.log(response)
      const { organisations } = this.props
      const organisation = organisations.find(organisation => organisation.id === organisationId)
      this.setState({ organisation })
    })
    console.log('organisation join successful!')
  }

  componentDidMount() {
    this.props.fetchUser()
  }

  render() {

    return(
      <div className='organisations'>
        <h3> Organisations </h3>
        <ul>
          <React.Fragment>
            {
              this.props.organisations.length > 0 && this.props.organisations.map((organisation, index) => {
                return(
                  <li key={index}>
                    {organisation.name}
                    <span>  |  </span>
                    <Link to={{
                      pathname: '/edit',
                      state: {
                        organisation: this.props.organisation,
                        user: this.props.user,
                        sessionId: this.props.sessionId
                      }
                    }}>
                      Edit
                    </Link>
                    <span>  |  </span>
                    <Link to='/home' onClick={() => this.handleJoin(organisation.id)}>
                      Join
                    </Link>
                  </li>
                )
              })
            }
          </React.Fragment>
        </ul>
      </div>
    )
  }
}

export default Organisations;
