import React from 'react';
// import MatchItemAppliList from './MatchItemAppliList';

export default function MatchItemDetail(props) {
  const { item } = props;
  return (
    <div>
      <h1>{item.title}</h1>
      <p>{item.category}</p>
      <p>{item.content}</p>
      {item.state ? <p>상태 : 모집중</p> : <p>상태 : 마감</p>}
    </div>
  );
}
