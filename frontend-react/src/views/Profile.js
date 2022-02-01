import * as React from 'react';
import { useSelector } from 'react-redux';
import Checkstudy from '../components/Checkstudy';

function Profile() {
  const loginPage = useSelector((state) => state.user.isLogin);
  const yourName = useSelector((state) => state.user.userInfo.name);
  const Info = useSelector((state) => state.user.userInfo);
  console.log(Info);
  // 추후 스터디로 바뀔 예정
  const weekArr = ['공모주', '가나다라', '삼성전자 10만가자 제발'];

  return (
    <div>
      {loginPage && (
        <div>
          <h1>{yourName}님의 프로필입니다</h1>
          <Checkstudy name={weekArr} />
        </div>
      )}
      {!loginPage && (
        <div>
          <h1>안녕하세요 로그인을 해주시겠어요?</h1>
        </div>
      )}
    </div>
  );
}

export default Profile;
