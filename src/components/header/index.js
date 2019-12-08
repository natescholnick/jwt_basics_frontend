import React, { Component } from 'react';
import './index.css';
import { NavLink } from 'react-router-dom';


export default class Header extends Component {
  render() {
    return(
      <header className='header'>
        <nav className='navbar navbar-light bg-light'>
          {
            !this.props.logged_in ?
              <span>
                <NavLink className='navbar-brand' to='/'>Login</NavLink>
                <NavLink className='navbar-brand' to='/register'>Register</NavLink>
              </span>
            :
              <span>
                <NavLink className='navbar-brand' to='/data'>Data</NavLink>
                <NavLink onClick={this.props.logout} className='navbar-brand' to='/'>Logout</NavLink>
              </span>
          }

        </nav>
      </header>
    )
  }
}
