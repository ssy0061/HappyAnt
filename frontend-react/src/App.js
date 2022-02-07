import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Join from './views/Join';
import Login from './views/Login';
import Profile from './views/Profile';
import Nav from './views/Nav';
import Match from './views/Match';
import StudyList from './views/StudyList';

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Match" element={<Match />} />
        <Route path="/studyList" element={<StudyList />} />
      </Routes>
    </div>
  );
}

export default App;
