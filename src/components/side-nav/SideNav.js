import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { updateUser, logout } from './../../ducks/reducer';

import homeLogo from './../../assets/home_logo.png';
import newLogo from './../../assets/new_logo.png';
import logoutLogo from './../../assets/shut_down.png';
import './SideNav.css';

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    axios.get('/api/auth/me')
      .then(res => {
        this.props.updateUser(res.data);
      })
  }
  logout() {
    axios.post('/api/auth/logout')
      .then(res => this.props.logout())
  }
  render() {
    if (this.props.location.pathname !== '/') {
      return (
        <div className='Nav'>
          <div className='nav_profile_container'>
            <div className='nav_profile_pic' style={{ backgroundImage: `url('${this.props.profilePic}')` }}></div>
            <p>{this.props.username}</p>
          </div>
          <div className='nav_links'>
            <Link to='/dashboard'><img className='nav_img' src={homeLogo} alt='home' /></Link>
            <Link to='/new'><img className='nav_img' src={newLogo} alt='new post' /></Link>
          </div>
          <Link to='/' onClick={this.logout}><img className='nav_img logout' src={logoutLogo} alt='logout' /></Link>
        </div>
      )
    } else {
      return null
    }
  }
}
function mapStateToProps(state) {
  return state;
}
export default withRouter(connect(mapStateToProps, { updateUser, logout })(SideNav));