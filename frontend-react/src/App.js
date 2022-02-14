import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Join from './views/Join';
import Login from './views/Login';
import Profile from './views/Profile';
import Nav from './views/Nav';
import Match from './views/Match';
import Study from './views/Study';
import StudyList from './views/StudyList';
import Main from './views/Main';
import Alert from './websocket/Alert';
import { onSilentRefresh } from './utils/Login';

function App() {
  useEffect(() => {
    onSilentRefresh();
  }, []);

  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/match" element={<Match />} />
        <Route path="/study/:studyId" element={<Study />} />
        <Route path="/studyList" element={<StudyList />} />
      </Routes>
      <Alert />
    </div>
  );
}

export default App;
