import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function MatchingAppliList(props) {
  const { articleId } = props;
  const yourName = useSelector((state) => state.user.userInfo.name);
  const [applilist, setApplilist] = useState('');

  axios({
    method: 'get',
    url: `/match/join/${articleId}`,
  })
    .then((response) => {
      console.log(response);
      setApplilist(response);
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <div>
      <h1>{applilist}</h1>
      <h1>{yourName}</h1>
    </div>
  );
}

export default MatchingAppliList;
