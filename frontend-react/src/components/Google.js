import axios from 'axios';
import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';

import { Modal, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Guideline from './Guideline';
import { login } from '../redux/userSlice';

const clientId = process.env.REACT_APP_GOOGLE_KEY;

function GoogleLoginBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const responseGoogle = (response) => {
    console.log(response);

    const pass = response.profileObj.googleId.substr(0, 8);
    console.log(pass);
    // 회원가입
    axios({
      method: 'post',
      url: '/account/signUp',
      data: {
        email: response.profileObj.email,
        name: response.profileObj.name,
        password: `${pass}Zz!`,
      },
    })
      .then((res) => {
        console.log(res);
        // 회원가입 성공

        setOpen(true);
        // 로그인
        axios({
          method: 'post',
          url: '/account/login',
          data: {
            email: response.profileObj.email,
            password: `${pass}Zz!`,
          },
        })
          .then((ress) => {
            console.log(ress);
            dispatch(login(ress.data));
            // localStorage.setItem('jwt', res.data.token);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.log(error);

        // 이미 존재하는 회원이라면 로그인 시도
        axios({
          method: 'post',
          url: '/account/login',
          data: {
            email: response.profileObj.email,
            password: `${pass}Zz!`,
          },
        })
          .then((ress) => {
            console.log(ress);
            dispatch(login(ress.data));
            // localStorage.setItem('jwt', res.data.token);
            navigate('/profile');
          })
          .catch((err) => {
            console.log(err);
          });
      });
  };
  // 모달 스타일
  const style = {
    position: 'absolute',
    // 배치(가운데 정렬)
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // 크기
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="구글로 로그인 하기"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy="single_host_origin"
      />
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Guideline />
        </Box>
      </Modal>
    </div>
  );
}

export default GoogleLoginBtn;
