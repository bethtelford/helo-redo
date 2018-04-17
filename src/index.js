import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import store from './ducks/store';
import App from './App';
import { unregister } from './registerServiceWorker';

import './reset.css';
import axios from 'axios';

// Checking if there is a BASEURL that is being set for this project.
// If so use it
if (process.env.REACT_APP_BASEURL){
    axios.defaults.baseUrl = process.env.REACT_APP_BASEURL;
}


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>, document.getElementById('root'));
unregister();
