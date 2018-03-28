import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Auth from './components/auth/Auth';
import Dash from './components/dash/Dash';
import Post from './components/post/Post';
import Form from './components/form/Form';

export default (
  <Switch>
    <Route path='/' exact component={Auth} />
    <Route path='/dashboard' component={Dash} />
    <Route path='/post/:id' component={Post} />
    <Route path='/new' component={Form} />
    <Route path='/edit/:id' component={Form} />
  </Switch>
)