import React, P Component } from 'react';
import './App.css';
import Header from './components/header';
import { Swtich, Route } from 'react-router-dom';
import Login from './views/login';
import Register from './views/register';
import Data from './views/data';
import SECRET_KEY from './config.js';
let jwt = require('jsonwebtoken');


export default class App extends Component {
  constructor() {
    super();

    this.state ={
      logged_in = false
    }
  }

  handleLogin = async(e) => {
    e.preventDefault();

    let email = e.target.elements.email.value;
    let password = e.target.elements.pass.value;

    const URL = `http://localhost:5001/api/login`;

    let token = jwt.sign(
      { 'email': email, 'password': password },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    let res = await fetch(URL, {
      headers: {
        'Centent-type': 'application/json',
        'token': token
      }
    });

    let data = await res.json();

    if(data.message === 'success') {
      this.setState({ logged_in: true });
      localStorage.setItem('token', data.token);
      alert('You are now logged in!')
    } else {
      alert(data.message);
    }
  }

  handleRegister = async(e) => {
    e.preventDefault();

    let email = e.target.elements.email.value;
    let password = e.target.elements.pass.value;

    const URL = `http://localhost:5001/api/register`;

    let token = jwt.sign(
      { 'email': email, 'password': password },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    let res = await fetch(URL, {
      headers: {
        'Centent-type': 'application/json',
        'token': token
      }
    });

    let data = await res.json();

    if(data.message === 'success') {
      alert('You are now registered!')
    } else {
      alert(data.message);
    }
  }

  logout = () => {
    localStorage.removeItem('token');
    alert('You are now logged out!');
    this.setState({logged_in=false});
  }

  componentDidMount() {
    let token = localStorage.getItem('token', null);

    if (token !== null) {
      this.setState({logged_in: true});
    }
  }

  render() {
    return(
      <div className='App'>
        <Header logged_in={this.state.logged_in} logout={this.logout} />

        <div className='container'>
          <Switch>
            <Route exact path ='/' render={() => <Login logged_in={this.state.logged_in} handleLogin={this.handleLogin} />} />
            <Route exact path ='/register' render={() => <Register logged_in={this.state.logged_in} handleRegister={this.handleRegister} />} />

            {
              this.state.logged_in ?
                <Route exact path ='/data' render={() => <Data />} />
              :
                <p>You may only access this page if logged in.</p>
            }
          </Switch>
        </div>
      </div>
    )
  }
}
