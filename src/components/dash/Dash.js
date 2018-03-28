import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import searchLogo from './../../assets/search_logo.png';
import './Dash.css';

class Dash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      myPosts: true,
      posts: []
    }
    this.grabPosts = this.grabPosts.bind(this);
  }
  componentDidMount() {
    this.grabPosts();
  }
  grabPosts() {
    let { search, myPosts } = this.state;
    let url = `/api/posts/${this.props.userId}`;
    if (myPosts && !search) {
      url += '?mine=true'
    } else if (!myPosts && search) {
      url += `?search=${search}`
    } else if (myPosts && search) {
      url += `?mine=true&search=${search}`
    }
    axios.get(url)
      .then(res => {
        this.setState({
          posts: res.data
        })
      })
  }
  render() {
    let posts = this.state.posts.map((el) => {
      console.log(el)
      return <div key={el.id} className='content_box dash_post_box'>
        <h3>{el.title}</h3>
        <div className='dash_post_author_box'>
          <p>by {el.author_username}</p>
          <img src={el.profile_pic} alt='author picture' />
        </div>
      </div>
    })
    return (
      <div className='Dash'>
        <div className='content_box dash_filter'>
          <div className='dash_search_box'>
            <input value={this.state.search} onChange={e => this.setState({ search: e.target.value })}className='dash_search_bar' placeholder='Search by Title' />
            <img onClick={this.grabPosts}className='dash_search_button' src={searchLogo} alt='search' />
          </div>
          <div className='dash_check_box'>
            <p>My Posts</p>
            <input checked={this.state.myPosts} onChange={_ => this.setState({ myPosts: !this.state.myPosts }, this.grabPosts)} type='checkbox' />
          </div>
        </div>
        <div className='content_box dash_posts_container'>
          {posts}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    userId: state.userId
  }
}
export default connect(mapStateToProps)(Dash);