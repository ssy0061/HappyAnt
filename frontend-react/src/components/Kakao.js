import axios from 'axios';
import React, { useState } from 'react';
import { Modal, Box } from '@mui/material';

import Guideline from './Guideline';

const { Kakao } = window;

function KakaoLogin() {
  const [open, setOpen] = useState(false);
  const loginWithKakao = () => {
    Kakao.Auth.loginForm({
      success() {
        // console.log(authObj);
        Kakao.API.request({
          url: '/v2/user/me',
          success(response) {
            console.log(response);
            axios({
              method: 'post',
              url: '/account/signUp',
              data: {
                email: response.kakao_account.email,
                name: response.kakao_account.profile.nickname,
                password: `${response.id}Zz!`,
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
          },
        });
      },
      fail(err) {
        console.log(err);
        alert('로그인에 실패했습니다.');
      },
    });
  };
  // 모달
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
      {/* eslint-disable jsx-a11y/anchor-is-valid */}
      <a id="custom-login-btn" onClick={loginWithKakao} href="#">
        <img
          src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
          width="182"
          height="45"
          alt="카카오"
        />
      </a>
      {/* 모달 */}
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

export default KakaoLogin;
