import React, { Component } from 'react';
import { Router, Link } from '@reach/router';

import NumberViewer from './components/NumberViewer';
import NumberMap from './components/NumberMap';

import './App.css';

const NavLink = props =>
  <Link
    getProps={({ isCurrent }) => isCurrent
      ? { style: { color: '#999', pointerEvents: 'none' } }
      : null}
    {...props}
  />;

class App extends Component {
  render () {
    return (
      <div className="App">
        <header className="App-header">
          <ul className="nav">
            <li>
              <NavLink to={`${process.env.PUBLIC_URL}/`}>Viewer</NavLink>
            </li>
            <li>
              <NavLink to={`${process.env.PUBLIC_URL}/map`}>Value Map</NavLink>
            </li>
          </ul>
          <h1>Number Viewer</h1>
        </header>
        <Router>
          <NumberViewer path={`${process.env.PUBLIC_URL}/`}/>
          <NumberMap path={`${process.env.PUBLIC_URL}/map`}/>
        </Router>
      </div>
    );
  }
}

export default App;
