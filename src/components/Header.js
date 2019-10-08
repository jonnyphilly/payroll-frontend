import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return(
      <div className='header'>
        <h1>
          <Link to='/home'>
            Tanda Challenge
          </Link>
        </h1>
      </div>
    )
  }
}

export default Header;
