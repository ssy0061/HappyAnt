import React, { useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import FindPassword from '../components/FindPassword';
import { login } from '../redux/userSlice';

export default function Login() {
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  // 이벤트 관리
  const handleInputId = (e) => {
    setInputId(e.target.value);
  };
  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  const onClickLogin = (e) => {
    e.preventDefault();

    const body = {
      email: inputId,
      password: inputPw,
    };
    // axios -> dispatch로 login부름 && set로컬스토리지jwt저장 && response가 성공하면 console로 확인
    axios
      .post('/login', body)
      .then((res) => {
        dispatch(login(inputId));
        localStorage.setItem('jwt', res.data.token);
        console.log('login success');
      })
      .catch((err) => console.log(err));
  };

  // ---------------------------- render--------------------------------
  return (
    <div>
      <h1>Login</h1>
      <div>
        <label htmlFor="input_id">ID : </label>
        <input
          type="text"
          name="input_id"
          value={inputId}
          placeholder="E-mail을 입력해주세요"
          onChange={handleInputId}
        />
      </div>
      <div>
        <label htmlFor="input_pw">PW : </label>
        <input
          type="password"
          name="input_pw"
          value={inputPw}
          placeholder="비밀번호를 입력해주세요"
          onChange={handleInputPw}
        />
      </div>
      <div>
        <Button type="button" variant="contained" onClick={onClickLogin}>
          Login
        </Button>
        {/* 로그인 완료 시 마이페이지(메인) 으로 이동 */}
      </div>
      <br />
      <div>
        <Link to="/join">
          <Button type="button" variant="outlined">
            회원가입
          </Button>
        </Link>
        <Button type="button" variant="outlined" onClick={handleClickOpen}>
          비밀번호 찾기
        </Button>
        {/* 모달창 open -> 가입 이메일 입력 -> [추가항목 보임] 비밀번호 찾기 질문 입력/확인 -> 비밀번호 변경 완료 확인 및 재로그인 하라고 알려줌  */}
      </div>
      {open && <FindPassword handleClickClose={handleClickClose} />}
    </div>
  );
}
