import axios from 'axios';
import React from 'react';

const { Kakao } = window;

const loginWithKakao = () => {
  Kakao.Auth.loginForm({
    success() {
      // console.log(authObj);
      Kakao.API.request({
        url: '/v2/user/me',
        success(response) {
          axios({
            method: 'post',
            url: '/account/signup',
            data: {
              email: response.kakao_account.email,
              nickname: response.kakao_account.profile.nickname,
              password: `${response.id}Zz`,
            },
          })
            .then((res) => {
              console.log(res);
              // 회원가입 성공
            })
            .catch((error) => {
              console.log(error);
              alert('로그인에 실패했습니다.');
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

function KakaoLogin() {
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
    </div>
  );
}

export default KakaoLogin;
