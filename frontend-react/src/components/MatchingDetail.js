import React from 'react';
import axios from 'axios';

export default function MatchingDetail(props) {
  const { pk } = props;
  let matchItem = [];
  axios
    .get(`/match/${pk}`)
    .then((res) => {
      matchItem = res.data;
      console.log(matchItem);
    })
    .catch((err) => console.log(err));

  return (
    <div>
      <h1>{pk}번 글 detail</h1>
    </div>
  );
}
