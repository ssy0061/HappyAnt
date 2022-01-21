import React, { useEffect } from 'react';

const { Kakao } = window;
// const id = process.env.REACT_APP_KAKAO_KEY;
const id = '6b08a8ba7e847bc546a918fe4d2b37c4';

const loginWithKakao = () => {
  Kakao.Auth.loginForm({
    success() {
      // console.log(authObj);
      Kakao.API.request({
        url: '/v2/user/me',
        success(response) {
          console.log(response);
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
  useEffect(() => {
    Kakao.init(id);
  }, []);
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
