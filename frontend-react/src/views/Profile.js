import axios from 'axios';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import BtnEntrust from '../components/BtnEntrust';
// import Checkstudy from '../components/Checkstudy';

function Profile() {
  const loginPage = useSelector((state) => state.user.isLogin);
  const yourName = useSelector((state) => state.user.userInfo.name);
  const Info = useSelector((state) => state.user.userInfo);
  const [study, setStudy] = useState('');
  console.log(Info.email, 'email');
  // 추후 스터디로 바뀔 예정
  const getStudy = () => {
    axios
      .get(`/account/{email}?email=${Info.email}`)
      .then((res) => {
        console.log(res.data, 'study');
        setStudy(res.data);
      })
      .catch((err) => console.log(err, 'dont study'));
  };
  useEffect(() => {
    getStudy();
  }, []);
  return (
    <div>
      {loginPage && (
        <div>
          <h1>{yourName}님의 프로필입니다</h1>
          {/* <Checkstudy study={study} /> */}
          {study.joinStudy}
        </div>
      )}
      {!loginPage && (
        <div>
          <h1>안녕하세요 로그인을 해주시겠어요?</h1>
        </div>
      )}
      {/* <BtnEntrust /> */}
    </div>
  );
}

export default Profile;
