import React, { Component } from 'react';
import './index.css';
import { Redirect } from 'react-router-dom';


export default class Register extends Component {
  render() {
    if (this.props.logged_in === true) {
      return <Redirect to='/data' />
    }
    return(
      <div className='register'>
        <h1>Register</h1>
        <div className='row'>
          <div className='col-md-4 offset-md-4'>
            <form onSubmit={this.props.handleRegister}>
              <input className='form-control' type='email' name='email' placeholder='Email...' />
              <input className='form-control' type='password' name='pass' placeholder='Password...' />
              <input className='btn btn-primary' type='submit' value='register' />
            </form>
          </div>
        </div>
      </div>
    )
  }
}
