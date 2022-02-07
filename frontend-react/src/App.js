import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Join from './views/Join';
import Login from './views/Login';
import Profile from './views/Profile';
import Nav from './views/Nav';
import Match from './views/Match';

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/match" element={<Match />} />
      </Routes>
    </div>
  );
}

export default App;
