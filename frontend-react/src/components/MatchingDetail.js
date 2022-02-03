import React, { useState } from 'react';
import axios from 'axios';
import MatchingAppliList from './MatchingAppliList';

export default function MatchingDetail(props) {
  const { pk } = props;
  const [matchItem, setMatchItem] = useState('');
  const [writer, setWriter] = useState('');
  console.log(pk);
  axios
    .get(`/match/${pk}`)
    .then((res) => {
      setMatchItem(res.data);
      setWriter(matchItem.writerId);
    })
    .catch((err) => console.log(err));

  return (
    <div>
      <h1>{pk}번 글 detail</h1>
      <MatchingAppliList pk={pk} writer={writer} />
    </div>
  );
}
