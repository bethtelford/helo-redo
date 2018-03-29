import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { updateUser } from './../../ducks/reducer';

import logo from './../../assets/helo_logo.png';
import './Auth.css';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }
  handleChange(prop, val) {
    if (val.length < 12) {
      this.setState({
        [prop]: val
      })
    }
  }
  login() {
    axios.post('/api/auth/login', this.state)
      .then(res => {
        this.props.updateUser(res.data);
        this.props.history.push('/dashboard');
      })
  }
  register() {
    axios.post('/api/auth/register', this.state)
      .then(res => {
        this.props.updateUser(res.data);
        this.props.history.push('/dashboard');
      })
  }
  render() {
    return (
      <div className='Auth'>
        <div className='auth_container'>
          <img src={logo} alt='logo' />
          <h1 className='auth_title'>Helo</h1>
          <div className='auth_input_box'>
            <p>Username:</p>
            <input value={this.state.username} onChange={e => this.handleChange('username', e.target.value)} />
          </div>
          <div className='auth_input_box'>
            <p>Password:</p>
            <input value={this.state.password} type='password' onChange={e => this.handleChange('password', e.target.value)} />
          </div>
          <div className='auth_button_container'>
            <button className='dark_button' onClick={this.login}> Login </button>
            <button className='dark_button' onClick={this.register}> Register </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { updateUser })(Auth);