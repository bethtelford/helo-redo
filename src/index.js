import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import store from './ducks/store';
import App from './App';
import { unregister } from './registerServiceWorker';

import './reset.css';
import axios from 'axios';

// Checking if in production
// If so use a baseUrl to get it from here.
if (process.env.NODE_ENV === 'production'){
	axios.defaults.baseURL = 'https://helo.devmountain.com/v2/'
}


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>, document.getElementById('root'));
unregister();
