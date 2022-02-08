import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { logout } from '../redux/userSlice';

function nav() {
  // 로그인 상태 체크
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginPage = useSelector((state) => state.user.isLogin);
  const yourName = useSelector((state) => state.user.userInfo.name);

  const clickLogout = () => {
    dispatch(logout());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };
  // const userName = useSelector((state) => state.user.username);
  // const clickStudy = () => {
  //   navigate('/study');
  // };

  return (
    <div>
      <h1>Navbar</h1>
      <Link to={`/study/${1}`}>1번스터디로 가기</Link>
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
              <Link to="/Match">매칭 게시판</Link>
            </li>
            <li>
              <button type="submit" onClick={clickLogout}>
                로그아웃
              </button>
            </li>
          </ul>
          {/* <FormControl style={{ width: '256px' }}>
            <InputLabel id="demo-simple-select-label">내스터디 목록</InputLabel>
            <Select label="스터디 목록" value={studyId} onChange={clickStudy}>
              <MenuItem onClick={console.log('1번')} value={1}>
                1번 스터디 이름
              </MenuItem>
              <MenuItem onClick={console.log('2번')} value={2}>
                2번 스터디 이름
              </MenuItem>
              <MenuItem onClick={console.log('3번')} value={3}>
                3번 스터디 이름
              </MenuItem>
            </Select>
          </FormControl> */}
        </div>
      )}
    </div>
  );
}

export default nav;
