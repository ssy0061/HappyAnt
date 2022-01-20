import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Join from './views/Join';
import Login from './views/Login';
import Profile from './views/Profile';

function App() {
  return (
    <div>
      <h1>Navbar</h1>
      <ul>
        <li>
          <Link to="/join">회원가입</Link>
        </li>
        <li>
          <Link to="/login">로그인</Link>
        </li>
        <li>
          <Link to="/profile">프로필</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
