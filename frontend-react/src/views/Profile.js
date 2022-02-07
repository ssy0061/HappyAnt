import * as React from 'react';
import { useSelector } from 'react-redux';
// import BtnEntrust from '../components/BtnEntrust';
// import Checkstudy from '../components/Checkstudy';

function Profile() {
  // 로그인 확인
  const loginPage = useSelector((state) => state.user.isLogin);
  // 유저 정보 가져오기
  const Info = useSelector((state) => state.user.userInfo);
  console.log('profile페이지');
  console.log(Info, '유저 정보');
  const study = Info.joinStudy;
  console.log(study, '스터디');
  // console.log(study[0].id, '조인스터디');
  const studyList = () => {
    if (study) {
      const list = [];
      for (let i = 0; i < study.length; i += 1) {
        list.push(<p key={i}>{`${study[i].id} /`}</p>);
      }
      return <div>{list}</div>;
    }
    return <div>스터디를 신청해 보세요!</div>;
  };

  return (
    <div>
      {loginPage && (
        <div>
          <h1>{Info.name}님의 프로필입니다</h1>
          <hr />
          <h3>스터디 목록</h3>
          {studyList()}
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
