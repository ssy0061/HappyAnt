import axios from 'axios';
import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';

import { Modal, Box } from '@mui/material';

import Guideline from './Guideline';

const clientId = process.env.REACT_APP_GOOGLE_KEY;

function GoogleLoginBtn() {
  const [open, setOpen] = useState(false);
  const responseGoogle = (response) => {
    console.log(response);
    const pass = response.yu.DW.substr(0, 8);
    console.log(pass);

    axios({
      method: 'post',
      url: '/account/signUp',
      data: {
        email: response.yu.nv,
        name: response.yu.nf,
        password: `${pass}Zz!`,
      },
    })
      .then((res) => {
        console.log(res);
        // 회원가입 성공
        setOpen(true);
      })
      .catch((error) => {
        console.log(error);

        alert('로그인에 실패했습니다.');
        // 회원가입에 실패했다면 로그인을 시도해보자
        // 그럼 회원가입과 로그인 둘다 가능한 컴포넌트??
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
