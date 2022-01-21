import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import FindPassword from '../components/FindPassword';

export default function Login() {
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');
  const [open, setOpen] = useState(false);

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

  // axios로 서버에 요청, store에 user info와 토큰저장
  const onClickLogin = () => {
    axios
      .post('/login', null, {
        params: {
          user_id: inputId,
          user_pw: inputPw,
        },
      })
      .then((res) => console.log(res))
      .catch();
  };

  useEffect(() => {
    axios
      .get('/')
      .then((res) => console.log(res))
      .catch();
  });

  // ----------------- css --------------------
  // ------------------ render---------------
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
        <Button type="button" variant="outlined">
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
