import React from 'react';
import { withRouter } from 'react-router-dom';

import SideNav from './components/side-nav/SideNav';
import routes from './routes';

import './App.css';

function App() {
  return (
    <div className='App'>
      <SideNav />
      {routes}
    </div>
  )
}

export default withRouter(App);
