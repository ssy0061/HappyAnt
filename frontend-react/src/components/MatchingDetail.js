import React from 'react';

export default function MatchingDetail(props) {
  const { item } = props;

  return (
    <div>
      <h1>{item.title}</h1>
      <p>{item.category}</p>
      <p>{item.content}</p>
      {item.state ? <p>마감되었습니다.</p> : <p>모집중입니다.</p>}
    </div>
  );
}
