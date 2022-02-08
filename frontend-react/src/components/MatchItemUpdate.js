import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { useSelector } from 'react-redux';

export default function MatchItemUpdate(props) {
  const { item, goDetail } = props;

  const [inputTitle, setInputTitle] = useState('');
  const [inputContent, setInputContent] = useState('');
  const [inputCategory, setInputCategory] = useState('');
  const [memberNum, setMemeberNum] = useState(2);
  const yourId = useSelector((state) => state.user.userInfo.userId);

  const handleInputTitle = (e) => {
    setInputTitle(e.target.value);
  };
  const handleInputContent = (e) => {
    setInputContent(e.target.value);
  };
  const handleMemberNum = (e) => {
    setMemeberNum(e.target.value);
  };
  const handleInputCategory = (e) => {
    setInputCategory(e.target.value);
  };

  const clickSubmit = () => {
    axios
      .put(`/match/${item.articleId}`, [], {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        params: {
          loginUserId: yourId,
          category: inputCategory,
          title: inputTitle,
          content: inputContent,
        },
      })
      .then(goDetail)
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>update</h1>
      <DialogTitle>글 수정 폼</DialogTitle>
      <DialogContent>
        <div>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="제목"
            type="title"
            fullWidth
            defaultValue={item.title}
            variant="standard"
            onChange={handleInputTitle}
          />
        </div>
        <div>
          <TextField
            autoFocus
            margin="dense"
            label="카테고리"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={item.category}
            multiline
            onChange={handleInputCategory}
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
            defaultValue={item.content}
            multiline
            rows={15}
            onChange={handleInputContent}
          />
          <br />
          <br />
          <InputLabel>스터디원 수</InputLabel>
          <Select value={memberNum} label="멤버수" onChange={handleMemberNum}>
            <MenuItem value={2}>2명</MenuItem>
            <MenuItem value={3}>3명</MenuItem>
            <MenuItem value={4}>4명</MenuItem>
            <MenuItem value={5}>5명</MenuItem>
            <MenuItem value={6}>6명</MenuItem>
          </Select>
        </div>
        <DialogActions>
          <Button onClick={goDetail}>◀이전</Button>
          <Button onClick={clickSubmit}>완료✔</Button>
        </DialogActions>
      </DialogContent>
    </div>
  );
}
