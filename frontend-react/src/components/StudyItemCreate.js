import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

export default function StudyItemCreate() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const userId = useSelector((state) => state.user.userInfo.id);
  // const { handleClickClose } = props;

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const onClickCreate = () => {
    const body = {
      title,
      content,
      writerId: userId,
    };

    if (title === '' || content === '') {
      console.log('내용을 기입해주세요.');
    } else {
      axios
        .post(`/study/${1}`, body)
        .then((res) => {
          console.log(res);
          // handleClickClose();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <Dialog open fullWidth maxWidth="md">
        <DialogTitle>(스터디)글 작성 폼</DialogTitle>
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
            <TextField
              autoFocus
              margin="dense"
              label="내용"
              type="text"
              fullWidth
              variant="outlined"
              multiline
              rows={15}
              onChange={handleContent}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickCreate}>작성</Button>
          {/* <Button onClick={handleClickClose}>취소</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
