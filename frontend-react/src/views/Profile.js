import * as React from 'react';
import { useSelector } from 'react-redux';
// import BtnEntrust from '../components/BtnEntrust';

function Profile() {
  // 로그인 확인
  const loginPage = useSelector((state) => state.user.isLogin);
  // 유저 정보 가져오기
  const Info = useSelector((state) => state.user.userInfo);
  console.log('profile페이지');
  console.log(Info, '유저 정보');
  const study = Info.joinStudy;
  console.log(study, '스터디');
  const goToPage = (id, e) => {
    // 30번째 줄 onclick에서 id(스터디 링크)를 받아 Link 이동
    // 스터디 페이지가 완성될 시 아래 코드 살려서 이동
    // document.location.href(`/study/${study[i].id}`);
    console.log(id);
    e.preventDefault();
  };
  // 스터디 리스트 나열하기
  const studyList = () => {
    if (study) {
      const list = [];
      for (let i = 0; i < study.length; i += 1) {
        list.push(
          <div>
            {/* 현재는 id로 되어있지만 추후 name으로 변경될 예정 */}
            <span key={i}>{`${study[i].id}`}스터디 이름</span>
            <button
              type="button"
              onClick={(e) => goToPage(`${study[i].id}`, e)}
            >
              페이지 이동
            </button>
          </div>
        );
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
