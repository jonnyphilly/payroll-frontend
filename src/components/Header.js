import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return(
      <div className='header'>
        <h1>
          <Link to='/home'>
            Payroll App
          </Link>
        </h1>
      </div>
    )
  }
}

export default Header;
