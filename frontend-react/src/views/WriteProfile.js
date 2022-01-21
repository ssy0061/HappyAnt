import React, { useState } from 'react';
import Button from '@mui/material/Button';

function WriteProfile() {
  const [text, setText] = useState('');
  const onChange = (e) => {
    setText(e.target.value);
  };
  const onReset = () => {
    setText('');
  };
  return (
    <div>
      <input onChange={onChange} value={text} />
      <Button onClick={onReset}>초기화</Button>
      <div>
        <b>값: </b>
        {text}
      </div>
      <h1>프로필을 작성하세요</h1>
    </div>
  );
}

export default WriteProfile;
