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
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';

export default function MatchItemCreate(props) {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [memberNum, setMemeberNum] = useState(2);
  const userId = useSelector((state) => state.user.userInfo.id);
  const { handleClickClose } = props;

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
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
      category,
      title,
      content,
      writerId: userId,
    };

    if (title === '' || content === '' || memberNum === '') {
      console.log('내용을 기입해주세요.');
    } else {
      axios
        .post('/match', body)
        .then((response) => {
          console.log(response);
          handleClickClose();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <Dialog open fullWidth maxWidth="md">
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
            <br />
            <br />
            <div>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="카테고리"
                type="title"
                fullWidth
                variant="outlined"
                onChange={handleCategory}
              />
            </div>
            <InputLabel>스터디원 수</InputLabel>
            <Select value={memberNum} label="멤버수" onChange={handleMemberNum}>
              <MenuItem value={2}>2명</MenuItem>
              <MenuItem value={3}>3명</MenuItem>
              <MenuItem value={4}>4명</MenuItem>
              <MenuItem value={5}>5명</MenuItem>
              <MenuItem value={6}>6명</MenuItem>
            </Select>
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
