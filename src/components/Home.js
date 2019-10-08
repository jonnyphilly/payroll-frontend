import React, { Component } from 'react';
import axios from 'axios';

import Organisations from './Organisations';
import Header from './Header';
import Body from './Body';
import CreateOrganisation from './CreateOrganisation';
import MyOrganisations from './MyOrganisations';

const baseAPI = `http://localhost:3000`;

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      organisations: [],
      organisation: {},
      sessionId: ''
    }
    // BINDING GOES HERE
    this.fetchUser = this.fetchUser.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.fetchOrganisations = this.fetchOrganisations.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleLeave = this.handleLeave.bind(this)
  }

  fetchUser() {
    if(this.props.location.state) {
      const { sessionId } = this.props.location.state
      this.setState({ sessionId })
      const headers = { 'Authorization': sessionId }
      axios.get(baseAPI + `/users/me`, { headers })
        .then(response => {
          this.setState({ user: response.data })
          // console.log(this.state.user)
        })
    }
    else {
      this.props.history.push({
        pathname: '/'
      })
    }
  }

  handleLogout() {
    console.log('logging out')
    axios.delete(baseAPI + `/auth/logout`, {
      headers: {
        'Authorization': this.state.sessionId
      }
    })
    .then(response => {
      if(response.status === 200) {
        this.setState({
          user: {},
          organisations: [],
          organisation: {},
          sessionId: ''
        })
        alert("Logged out successfully!")
        this.props.history.push({
          pathname: '/'
        })
      }
    })
  }

  fetchOrganisations() {
    console.log('fetching organisations')
    if(this.props.location.state) {
      const { sessionId } = this.props.location.state
      this.setState({ sessionId })
      const headers = { 'Authorization': sessionId }
      axios.get(baseAPI + `/organisations`, { headers })
      .then(response => {
        const { user } = this.state
        const organisation = response.data.find(organisation => organisation.id === user.organisationId)
        console.log(organisation)
        this.setState({
          organisations: response.data, organisation
        })
        this.props.history.push(`/home`)
      })
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('creating and joining organisation')
    const { sessionId } = this.state
    const headers = { 'Authorization': sessionId }
    axios.post(baseAPI + `/organisations/create_join`, {
      name: event.target.name.value,
      hourlyRate: event.target.rate.value
    },
    { headers })
    .then(
      this.fetchOrganisations(),
    )
    console.log('organisation created and joined')
  }

  handleLeave() {
    console.log('leaving organisation')
    axios.post(baseAPI + `/organisations/leave`, null, { headers: { 'Authorization': this.state.sessionId } })
    .then(response => {
      console.log(response)
      console.log('organisation left')
    })
    .then(
      this.setState({
        organisation: {}
      })
    )
    this.props.history.push(`/home`)
  }

  componentDidMount() {
    this.fetchUser()
    this.fetchOrganisations()
  }

  render() {
    return(
      <div className='container'>
        <Header
          user={this.state.user}
          organisations={this.state.organisations}
          organisation={this.state.organisation}
          sessionId={this.state.sessionId}
        />
        <Body
          user={this.state.user}
          organisations={this.state.organisations}
          organisation={this.state.organisation}
          sessionId={this.state.sessionId}
          handleLogout={this.handleLogout}
        />
        {
          this.state.organisations.length > 0
          ?
          <Organisations
            organisations={this.state.organisations}
            user={this.state.user}
            sessionId={this.state.sessionId}
            handleLogout={this.handleLogout}
            organisation={this.state.organisation}
            fetchUser={this.fetchUser}
            fetchOrganisations={this.fetchOrganisations}
          />
          :
          <span> </span>
        }
        <CreateOrganisation
          user={this.state.user}
          organisations={this.state.organisations}
          organisation={this.state.organisation}
          sessionId={this.state.sessionId}
          handleSubmit={this.handleSubmit}
        />
        <React.Fragment>
          {
            this.state.user.organisationId
              ?
              <MyOrganisations
                user={this.state.user}
                organisations={this.state.organisations}
                organisation={this.state.organisation}
                sessionId={this.state.sessionId}
                handleLeave={this.handleLeave}
              />
              : <span> </span>
            }
          </React.Fragment>

      </div>
    )
  }
}

export default Home;
