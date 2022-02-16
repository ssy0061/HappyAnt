import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import axios from 'axios';

export default function StudyCommentCreate({ articleId, reRender }) {
  const yourId = useSelector((state) => state.user.userInfo.userId);
  const [inputContent, setIntputContent] = useState('');
  const { studyId } = useParams();
  const handleContent = (e) => setIntputContent(e.target.value);
  const submitContent = (e) => {
    if (e.key === 'Enter' && inputContent !== '') {
      axios
        .post(`/api/study/${studyId}/${articleId}`, [], {
          params: {
            content: inputContent,
            loginUserId: yourId,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })
        .then((res) => {
          console.log(res);
          reRender();
          setIntputContent('');
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <TextField
        id="inputForm"
        variant="filled"
        value={inputContent}
        onChange={handleContent}
        onKeyPress={submitContent}
        fullWidth
      />
    </div>
  );
}
