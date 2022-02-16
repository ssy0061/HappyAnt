import React from 'react';
import ContentViewer from './ContentViewer';

export default function MatchItemDetail(props) {
  const { item } = props;
  console.log(item);
  return (
    <div>
      <h1>제목 : {item.title}</h1>
      <h1>스터디이름 : {item.studyName}</h1>
      <p>관심분야 : {item.studyInterest}</p>
      <ContentViewer initialValue={item.content} />
      {item.state ? <p>상태 : 마감</p> : <p>상태 : 모집중</p>}
    </div>
  );
}
