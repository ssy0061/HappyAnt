import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function MatchingAppliList(props) {
  const { pk } = props;
  const { writer } = props;
  const yourId = useSelector((state) => state.user.userInfo.id);
  const [applilist, setApplilist] = useState('');

  // 신청자 정보 받아오기
  axios
    .get(`match/join/{articleId}?articleId=${pk}`)
    .then((res) => {
      console.log(res.data);
      setApplilist(res.data);
    })
    .catch((err) => console.log(err, 'applierror'));

  // 로그인 한 사람과 작성자가 같을 시 보이는 부분
  if (writer === yourId) {
    const listing = () => {
      const result = [];
      for (let i = 0; i < applilist.length; i += 1) {
        result.push(<p key={i}>{`${applilist[i].userName}`}</p>);
      }
      return result;
    };

    return (
      <div>
        신청자
        <div>{listing()}</div>
      </div>
    );
  }
  // 로그인 한 유저와 작성자가 다를 시 null 추출
  return null;
}
