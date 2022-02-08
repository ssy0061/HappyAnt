import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import StudyCommentCreate from './StudyCommentCreate';

// 스터디의 게시글 id 받아옴 -> 해당 id로 코멘트 리스트 조회 -> 코멘트 개수 2개이상이면 거기부터 <더보기>로 표시 -> 더보기 클릭시 댓글 리스트 모달창으로 보여주고 무한스크롤 구현
// if 댓글작성자? 수정 삭제버튼 표시
export default function StudyCommentList(id) {
  const [comment, setComment] = useState([]);
  const yourId = useSelector((state) => state.user.userInfo.id);
  // const clickUpdate = () => {  }
  const commentList = comment.map((item) => (
    <>
      <span>{item.content}</span>
      {yourId === item.writerId && (
        <>
          {/* <button type="submit" onClick={clickUpdate(item.id)}>수정</button> */}
          <button type="submit">삭제</button>
        </>
      )}
    </>
  ));

  const getComment = () => {
    axios.get(`/study/${id}/comment`).then((res) => setComment(res.data));
  };

  useEffect(getComment(), []);

  return (
    <div>
      {commentList}
      <StudyCommentCreate />
    </div>
  );
}
