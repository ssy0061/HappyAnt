import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import StudyCommentCreate from './StudyCommentCreate';

// 스터디의 게시글 id 받아옴 -> 해당 id로 코멘트 리스트 조회 -> 코멘트 개수 2개이상이면 거기부터 <더보기>로 표시 -> 더보기 클릭시 댓글 리스트 모달창으로 보여주고 무한스크롤 구현
// if 댓글작성자? 수정 삭제버튼 표시
export default function StudyCommentList({ articleId }) {
  const { studyId } = useParams();
  const [updateCommentContent, setUpdateCommentContent] = useState('');
  const [comment, setComment] = useState([]);
  const [selectUpdateComment, setSelectUpdateComment] = useState('');
  const yourId = useSelector((state) => state.user.userInfo.userId);
  // const clickUpdate = () => {  }

  const getComment = () => {
    axios
      .get(`/study/${studyId}/${articleId}/comment`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((res) => {
        setComment(res.data);
      });
  };

  const deleteComment = (commentId) => {
    console.log('삭제 시도');
    axios
      .delete(`/study/${studyId}/${articleId}/${commentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        params: {
          loginUserId: yourId,
        },
      })
      .then(() => {
        setSelectUpdateComment('');
        getComment();
      })
      .catch((err) => console.log(err));
  };

  const submitUpdateCommentContent = (e, commentId) => {
    if (e.key === 'Enter') {
      axios
        .put(`/study/${studyId}/${articleId}/${commentId}`, [], {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
          params: {
            loginUserId: yourId,
            content: updateCommentContent,
          },
        })
        .then(() => {
          setSelectUpdateComment('');
        })
        .catch((err) => console.log(err));
    }
  };

  const handleUpdateCommentContent = (e) => {
    setUpdateCommentContent(e.target.value);
  };

  useEffect(() => {
    getComment();
  }, []);

  // -----------------------------------------------------------------------------렌더 ---------------------------------------------------------
  return (
    <div key={`studyArticleComment${articleId}`}>
      {comment.map((item, idx) => (
        <>
          {/* -------댓글내용(수정하려고 선택된 댓글이면 수정 폼 보여줌)-------- */}
          {selectUpdateComment === idx ? (
            <TextField
              id={`update${item.commentId}`}
              key={`update${item.commentId}`}
              variant="standard"
              defaultValue={item.content}
              onChange={() => handleUpdateCommentContent}
              onKeyPress={(e) => {
                submitUpdateCommentContent(e, item.commentId);
              }}
              fullWidth
            />
          ) : (
            <p key={item.commentId.toString()}>
              {item.content} | {item.createDate}
            </p>
          )}
          {/* -----작성자면 수정/삭제 버튼 보여주기------ */}
          {yourId === item.writerId && (
            <>
              <Button
                key={`commentUpdate${item.commentId}`}
                onClick={() => setSelectUpdateComment(idx)}
              >
                수정
              </Button>
              <Button
                key={`commentDelete${item.commentId}`}
                onClick={() => deleteComment(item.commentId)}
              >
                삭제
              </Button>
            </>
          )}
        </>
      ))}
      <StudyCommentCreate articleId={articleId} reRender={getComment} />
    </div>
  );
}
