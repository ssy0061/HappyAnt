import React from 'react';

export default function MatchItemDetail(props) {
  const { item } = props;
  console.log(item);
  return (
    <div>
      <h1>제목 : {item.title}</h1>
      <h1>스터디이름 : {item.studyName}</h1>
      <p>내용 : {item.content}</p>
      {item.state ? <p>상태 : 마감</p> : <p>상태 : 모집중</p>}
    </div>
  );
}
