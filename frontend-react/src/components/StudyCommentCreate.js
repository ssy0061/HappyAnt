import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import axios from 'axios';

export default function StudyCommentCreate() {
  const [inputContent, setIntputContent] = useState('');
  const studyId = useParams();
  const handleContent = (e) => setIntputContent(e.target.value);
  const submitContent = (e) => {
    if (e.key === 'enter') {
      console.log('보냄');
      axios
        .post(`/study/${studyId}/${`articleId`}`, {
          content: inputContent,
          writerId: `userId`,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <TextField
        id="inputForm"
        variant="filled"
        onChange={handleContent}
        onKeyUp={submitContent}
      />
    </div>
  );
}
