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

export default function MatchingUpdate(props) {
  const { pk } = props;

  const [inputTitle, setInputTitle] = useState('');
  const [inputContent, setInputContent] = useState('');
  const [memberNum, setMemeberNum] = useState(2);

  const handleInputTitle = (e) => {
    setInputTitle(e.target.value);
  };
  const handleInputContent = (e) => {
    setInputContent(e.target.value);
  };
  const handleMemberNum = (e) => {
    setMemeberNum(e.target.value);
  };

  const clickSubmit = () => {
    const body = {
      title: inputTitle,
      content: inputContent,
      memberNum,
    };
    axios
      .post(URL, body)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>update1 {pk}</h1>
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
            onChange={handleInputTitle}
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
            maxRows={20}
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
          <Button onClick={clickSubmit}>작성</Button>
        </DialogActions>
      </DialogContent>
    </div>
  );
}
