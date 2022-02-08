import React from 'react';
import MatchItemAppliList from './MatchItemAppliList';

export default function MatchItemDetail(props) {
  const { item, pk } = props;
  console.log(item);
  return (
    <div>
      <h1>제목 : {item.title}</h1>
      <p>카테고리 : {item.category}</p>
      <p>내용 : {item.content}</p>
      {item.state ? <p>상태 : 모집중</p> : <p>상태 : 마감</p>}
      <MatchItemAppliList item={item} pk={pk} />
    </div>
  );
}
