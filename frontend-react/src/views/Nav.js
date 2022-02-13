import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { logout } from '../redux/userSlice';
import UserDelete from '../components/Userdelete';
import StudyCreateBtn from '../components/StudyCreateBtn';
import AlertList from '../components/AlertList';

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

  // -----------------------css--------------------------------
  // const navbarDesign = {
  //   backgroundColor: '#f0f0f1',
  // };

  const navleft = {
    width: '20%',
  };

  return (
    <nav>
      {/* <h1>Navbar</h1> */}
      {/* 비로그인 상태일때 보이는 navbar */}
      {!loginPage && (
        <ul style={navleft}>
          <li>
            <Link to="/join">회원가입</Link>
          </li>
          <li>
            <Link to="/login">로그인</Link>
          </li>
        </ul>
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
              <StudyCreateBtn />
              <button type="submit" onClick={clickLogout}>
                로그아웃
              </button>
              <UserDelete />
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
      <AlertList />
    </nav>
  );
}

export default nav;
