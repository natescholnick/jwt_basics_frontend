import React, { Component } from 'react';
import './index.css';


export default class Data extends Component {
  constructor() {
    super();

    this.state = {
      data: {}
    }
  }

  getData = async(e) => {
    let token = localStorage.getItem('token');

    const URL = 'http://localhost:5001/api/data'

    let res = await fetch(URL, {
      headers: {
        'Content-type': 'application/json'.
        'token': token
      }
    });

    let data = await res.json();
    this.setState({ data });
  }

  render() {
    console.log(this.state.data);
    return(
      <div className='data'>
        <h1>Data</h1>
        <button onClick={this.getData} className='btn btn-primary'>Get Data</button>

        {
          this.state.data.info &&
            <div>
              <h3>Name: {this.state.data.name}</h3>
              <h3>Age: {this.state.data.age}</h3>
            </div>
        }
        {
          this.state.data.message &&
            <div>
              <h3>Invalid User</h3>
              <p>Try logging out and logging back in.</p>
            </div>
        }
      </div>
    );
  }
}
