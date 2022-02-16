import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MatchList from './MatchList';

function Match() {
  const isLogin = useSelector((state) => state.user.isLogin);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
      alert('로그인 후 이용해주세요.');
    }
  }, []);
  return (
    <div>
      <h1>Match</h1>
      <MatchList />
    </div>
  );
}

export default Match;
