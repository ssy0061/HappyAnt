import React from 'react';
import MatchingAppliList from './MatchingAppliList';

export default function MatchingDetail(props) {
  const { item } = props;
  console.log(item);
  const pk = item.articleId;

  return (
    <div>
      <div>
        <h1>{item.title}</h1>
        <p>{item.category}</p>
        <p>{item.content}</p>
        {item.state ? <p>마감되었습니다.</p> : <p>모집중입니다.</p>}
      </div>
      <div>
        <MatchingAppliList item={item} articleId={pk} />
      </div>
    </div>
  );
}
