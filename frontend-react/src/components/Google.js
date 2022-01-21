import React from 'react';
import GoogleLogin from 'react-google-login';

// const clientId = process.env.REACT_APP_GOOGLE_KEY;
const clientId =
  '222055822877-ilvcje5q9g974vnoj78hq5n4o6jm757a.apps.googleusercontent.com';

function GoogleLoginBtn() {
  const responseGoogle = (response) => {
    console.log(response);
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
