import axios from 'axios';
import React from 'react';
import GoogleLogin from 'react-google-login';

const clientId = process.env.REACT_APP_GOOGLE_KEY;

function GoogleLoginBtn() {
  const responseGoogle = (response) => {
    console.log(response);
    axios({
      method: 'post',
      url: '/account/signup',
      data: {
        email: response.yu.nv,
        nickname: response.yu.nf,
        password: `${response.yu.DW}Zz`,
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
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="구글로 로그인 하기"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy="single_host_origin"
    />
  );
}

export default GoogleLoginBtn;
