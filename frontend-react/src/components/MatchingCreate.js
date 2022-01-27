import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function MatchingCreate(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [memberNum, setMemeberNum] = useState(1);
  const { handleClickClose } = props;

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleMemberNum = (e) => {
    setMemeberNum(e.target.value);
  };

  const onClickCreate = () => {
    const body = {
      title,
      content,
      memberNum,
    };

    if (title === '' || content === '' || memberNum === '') {
      console.log('내용을 기입해주세요.');
    } else {
      axios
        .post('/match', body)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <Dialog open>
        <DialogTitle>글 작성 폼</DialogTitle>
        <DialogContent>
          <div>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="제목"
              type="title"
              fullWidth
              variant="standard"
              onChange={handleTitle}
            />
          </div>

          <div>
            <br />
            <br />
            <br />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="내용"
              type="content"
              fullWidth
              variant="standard"
              onChange={handleContent}
            />
            <br />
            <br />
            <br />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="멤버 수"
              type="content"
              fullWidth
              variant="standard"
              onChange={handleMemberNum}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickCreate}>작성</Button>
          <Button onClick={handleClickClose}>취소</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
