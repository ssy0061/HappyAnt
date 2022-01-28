import React, { useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FindPassword from '../components/FindPassword';
import { login } from '../redux/userSlice';

export default function Login() {
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 이벤트 관리
  const handleInputId = (e) => {
    setInputId(e.target.value);
  };
  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };
  // 비밀번호찾기 모달창 open / close
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  // 회원가입 버튼
  const clickJoin = () => {
    navigate('/join');
  };
  // 로그인 버튼
  const onClickLogin = (e) => {
    e.preventDefault();

    const body = {
      email: inputId,
      password: inputPw,
    };

    axios
      .post('/account/login', body)
      .then((res) => {
        dispatch(login(res.data));
        alert('안녕하세요!');
        navigate('/profile');
        console.log(res.data);
        // localStorage.setItem('jwt', res.data.token);
      })
      .catch((err) => {
        console.log(err);
        alert('로그인 정보를 확인하세요');
      });
  };
  const onCheckEnter = (e) => {
    if (e.key === 'Enter') {
      onClickLogin(e);
    }
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
          onKeyPress={onCheckEnter}
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
        <Button type="button" variant="outlined" onClick={clickJoin}>
          회원가입
        </Button>
        <Button type="button" variant="outlined" onClick={handleClickOpen}>
          비밀번호 찾기
        </Button>
        {/* 모달창 open -> 가입 이메일 입력 -> [추가항목 보임] 비밀번호 찾기 질문 입력/확인 -> 비밀번호 변경 완료 확인 및 재로그인 하라고 알려줌  */}
      </div>
      {open && <FindPassword handleClickClose={handleClickClose} />}
    </div>
  );
}
