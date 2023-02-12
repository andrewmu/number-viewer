import React from 'react';

import NumberViewer from './components/NumberViewer';
import NumberMap from './components/NumberMap';

import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

const NavLink = (props) => <Link {...props} />;

const App = () => (
  <BrowserRouter>
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
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<NumberViewer />} />
        <Route path={`${process.env.PUBLIC_URL}/map`} element={<NumberMap />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
