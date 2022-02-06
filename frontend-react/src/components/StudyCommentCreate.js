import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';

export default function StudyCommentCreate() {
  const [inputContent, setIntputContent] = useState('');
  const handleContent = (e) => setIntputContent(e.target.value);
  const submitContent = (e) => {
    if (e.key === 'enter') {
      console.log('보냄');
      axios
        .post(URL, { content: inputContent })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  return (
    <TextField
      variant="filled"
      onChange={handleContent}
      onKeyUp={submitContent}
    />
  );
}
