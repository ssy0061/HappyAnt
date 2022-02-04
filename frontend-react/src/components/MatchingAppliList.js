import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import MatchingAppliAccept from './MatchingAppliAccept';

export default function MatchingAppliList(props) {
  const { item } = props;
  // eslint-disable-next-line react/destructuring-assignment
  const pk = props.articleId;
  console.log(item, '1');
  const yourId = useSelector((state) => state.user.userInfo.id);
  const [applilist, setApplilist] = useState('');
  console.log(pk, 'ok');
  // const [modalOpen, setModalOpen] = useState(false);

  // 신청자 정보 받아오기
  const getApplilist = () => {
    axios
      .get(`match/join/{articleId}?articleId=${pk}`)
      .then((res) => {
        console.log(res.data, '신청자 리스트');
        setApplilist(res.data);
      })
      .catch((err) => console.log(err, 'applierror'));
  };
  if (!applilist.length) {
    getApplilist();
  }
  console.log(applilist, 'appli');
  // const openModal = () => {
  //   setModalOpen(true);
  // };
  // const closeModal = () => {
  //   setModalOpen(false);
  // };

  // 로그인 한 사람과 작성자가 같을 시 보이는 부분
  if (item.writerId === yourId) {
    const listing = () => {
      const result = [];
      for (let i = 0; i < applilist.length; i += 1) {
        result.push(
          <div>
            <p key={i}>
              {`${applilist[i].userName}`}
              <MatchingAppliAccept content={applilist[i].content} />
            </p>
          </div>
        );
      }
      return result;
    };

    return (
      <div>
        신청자
        {listing()}
      </div>
    );
  }
  // 로그인 한 유저와 작성자가 다를 시 null 추출
  return null;
}
