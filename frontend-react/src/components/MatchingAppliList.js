import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import MatchingAppliAccept from './MatchingAppliAccept';

export default function MatchingAppliList(props) {
  const { item } = props;
  // eslint-disable-next-line react/destructuring-assignment
  const pk = props.articleId;
  console.log(item, '1');
  const yourId = useSelector((state) => state.user.userInfo.userId);
  const [applilist, setApplilist] = useState('');
  console.log(pk, 'ok');
  console.log(applilist);

  // 신청자 정보 받아오기
  const getApplilist = () => {
    axios
      .get(`match/join/${pk}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
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

  // 로그인 한 사람과 작성자가 같을 시 보이는 부분
  if (item.writerId === yourId) {
    const listing = () => {
      const result = [];
      for (let i = 0; i < applilist.length; i += 1) {
        // 지원자의 state의 상태를 통해 리스트에 띄울지 말지 정함
        if (!applilist[i].state) {
          result.push(
            <div>
              <p key={i}>
                {`${applilist[i].userName}`}
                <MatchingAppliAccept
                  pk={pk}
                  content={applilist[i].content}
                  userId={applilist[i].userId}
                />
              </p>
            </div>
          );
        }
      }
      return result;
    };

    return (
      <div>
        <hr />
        신청자
        {listing()}
      </div>
    );
  }
  // 로그인 한 유저와 작성자가 다를 시 null 추출
  return null;
}
