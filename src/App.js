import React from 'react';

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

export default App;
