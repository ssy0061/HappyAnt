import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, login } from '../redux/userSlice';

function nav() {
  // 로그인 상태 체크
  const dispatch = useDispatch();
  const loginPage = useSelector((state) => state.user.isLogin);
  // const userName = useSelector((state) => state.user.username);

  const clickLogin = () => {
    const data = {
      username: 'user1',
    };
    dispatch(login(data));
  };
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
          {/* <h3>{userName}</h3> */}
          {/* <p>{userName} 님 안녕하세요</p> */}
          <ul>
            <li>
              <Link to="/profile">프로필</Link>
            </li>
            <li>
              <Link to="/Match">매칭 게시판</Link>
            </li>
            <li>
              <button type="submit" onClick={() => dispatch(logout())}>
                로그아웃
              </button>
            </li>
          </ul>
        </div>
      )}
      {/* 임시 버튼 */}
      <div>
        <button type="submit" onClick={clickLogin}>
          임시 로그인 버튼
        </button>
        <button type="submit" onClick={() => dispatch(logout())}>
          임시 로그아웃 버튼
        </button>
      </div>
    </div>
  );
}

export default nav;
