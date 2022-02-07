import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';

function nav() {
  // 로그인 상태 체크
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginPage = useSelector((state) => state.user.isLogin);
  const yourName = useSelector((state) => state.user.userInfo.name);

  const clickLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  // const userName = useSelector((state) => state.user.username);

  return (
    <div>
      <h1>Navbar</h1>
      {/* 비로그인 상태일때 보이는 navbar */}
      {!loginPage && (
        <div>
          <span>아직 개미키우기 회원이 아니라면 가입해보세요</span>
          <ul>
            <li>
              <Link to="/join">회원가입</Link>
            </li>
            <li>
              <Link to="/login">로그인</Link>
            </li>
          </ul>
        </div>
      )}
      {/* 로그인 상태일때 보이는 navbar */}
      {loginPage && (
        <div>
          <h3>{yourName}</h3>
          <ul>
            <li>
              <Link to="/profile">프로필</Link>
            </li>
            <li>
              <Link to="/match">매칭 게시판</Link>
            </li>
            <li>
              <button type="submit" onClick={clickLogout}>
                로그아웃
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default nav;
