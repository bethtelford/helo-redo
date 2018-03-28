import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import {connect} from 'react-redux';

import {logout} from './../../ducks/reducer';

import homeLogo from './../../assets/home_logo.png';
import newLogo from './../../assets/new_logo.png'; 
import logoutLogo from './../../assets/shut_down.png';
import './SideNav.css';

function SideNav(props) {
  if (props.location.pathname !== '/') {
    console.log('nav', props)
    return (
      <div className='Nav'>
        <div className='nav_profile_container'>
          <div className='nav_profile_pic' style={{ backgroundImage: `url('${props.profilePic}')` }}></div>
          <p>{props.username}</p>
        </div>
        <div className='nav_links'>
          <Link to='/dashboard'><img className='nav_img' src={homeLogo} alt='home' /></Link>
          <Link to='/new'><img className='nav_img' src={newLogo} alt='new post' /></Link>
        </div>
        <Link to='/' onClick={props.logout}><img className='nav_img logout' src={logoutLogo} alt='logout' /></Link>
      </div>
    )
  } else {
    return null
  }
}
function mapStateToProps(state) {
  return state
}
export default withRouter(connect(mapStateToProps, {logout})(SideNav));