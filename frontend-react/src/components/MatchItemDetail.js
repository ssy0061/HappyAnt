import React from 'react';
import ContentViewer from './ContentViewer';

export default function MatchItemDetail(props) {
  const { item } = props;
  console.log(item);
  return (
    <div>
      <h1>{item.title}</h1>
      <h3>{item.studyName}</h3>
      {item.state ? <span>마감</span> : <span>모집중</span>}
      <p>관심분야 : {item.studyInterest}</p>
      <ContentViewer initialValue={item.content} />
    </div>
  );
}
