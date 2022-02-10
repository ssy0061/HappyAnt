import axios from 'axios';
import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/userSlice';

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 로그인 확인
  const loginPage = useSelector((state) => state.user.isLogin);
  // 유저 정보 가져오기
  const Info = useSelector((state) => state.user.userInfo);
  console.log(Info.email);
  const renewal = () => {
    axios
      .get(`/account/{id}?email=${Info.email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        dispatch(login(response.data));
      })
      .catch((err) => console.log(err, 'profile err'));
  };
  useEffect(() => {
    renewal();
  }, []);

  console.log('profile페이지');
  console.log(Info, '유저 정보');
  const study = Info.joinStudy;
  console.log(study, '스터디');
  const goToPage = (id, e) => {
    navigate(`/study/${id}`);
    console.log(id);
    e.preventDefault();
  };
  // 스터디 리스트 나열하기
  const studyList = () => {
    if (study.length !== 0) {
      const list = [];
      for (let i = 0; i < study.length; i += 1) {
        list.push(
          <div key={i}>
            <span>{`${study[i].studyName}`}</span>
            <button
              type="button"
              onClick={(e) => goToPage(`${study[i].studyId}`, e)}
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
          <h1>{Info.userName}님의 프로필입니다</h1>
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
    </div>
  );
}

export default Profile;
