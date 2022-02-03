import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function MatchingAppliList(props) {
  const { pk } = props;
  const { writer } = props;
  const yourName = useSelector((state) => state.user.userInfo.name);
  const yourId = useSelector((state) => state.user.userInfo.id);
  const [applilist, setApplilist] = useState('');

  if (writer === yourId) {
    axios
      .get(`match/join/{articleId}?articleId=${pk}`)
      .then((res) => {
        console.log(res.data);
        setApplilist(res.data);
      })
      .catch((err) => console.log(err, 'applierror'));

    const listing = () => {
      const result = [];
      for (let i = 0; i < applilist.length; i += 1) {
        result.push(<p key={i}>{`${applilist[i].userName}`}</p>);
      }
      return result;
    };

    return (
      <div>
        <h1>{yourName}</h1>
        신청자
        <div>{listing()}</div>
      </div>
    );
  }
  return null;
}
