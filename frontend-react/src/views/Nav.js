import React from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { logout } from '../redux/userSlice';
import UserDelete from '../components/Userdelete';
import StudyCreateBtn from '../components/StudyCreateBtn';
import AlertList from '../components/AlertList';
import '../css/Nav.css';

function nav() {
  // 로그인 상태 체크
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginPage = useSelector((state) => state.user.isLogin);

  const clickLogout = (e) => {
    e.preventDefault();
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

  return (
    <nav className="container navbar">
      {/* 왼쪽 */}
      <div className="item itemLeft">
        <StudyCreateBtn />
        <p>스터디목록 넣을예정</p>
      </div>
      {/* 중앙 */}
      <div className="item itemCenter">
        <h2>Happy Ant</h2>
        <ul className="linkContainer">
          <NavLink
            style={{ marginLeft: '25px' }}
            to="/finance"
            className={({ isActive }) =>
              isActive ? 'linkItem active' : 'linkItem inactive'
            }
          >
            주식게시판
          </NavLink>
          <NavLink
            to="/match"
            className={({ isActive }) =>
              isActive ? 'linkItem active' : 'linkItem inactive'
            }
          >
            매치게시판
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? 'linkItem active' : 'linkItem inactive'
            }
          >
            프로필게시판
          </NavLink>
        </ul>
      </div>
      {/* 오른쪽 */}
      <div className="item itemRight">
        {!loginPage && (
          <ul className="memberContainer">
            <li>
              <Link to="/join">회원가입</Link>
            </li>
            <li>
              <Link to="/login">로그인</Link>
            </li>
          </ul>
        )}
        {loginPage && (
          <div>
            <ul className="memberContainer">
              <div>
                <a href="/" onClick={clickLogout}>
                  로그아웃
                </a>
              </div>
              <UserDelete />
            </ul>
            <AlertList />
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
    </nav>
  );
}

export default nav;
