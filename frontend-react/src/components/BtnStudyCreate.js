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

export default function MatchItemCreate(props) {
  const [interest, setInterest] = useState('');
  const [name, setName] = useState('');
  const userId = useSelector((state) => state.user.userInfo.userId);
  const { handleClickClose } = props;

  const handleInterest = (e) => {
    setInterest(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };

  const onClickCreate = () => {
    const data = {
      interest,
      name,
    };
    if (name === '' || interest === '') {
      console.log('내용을 기입해주세요.');
    } else {
      axios
        .post(`/study?loginUserId=${userId}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })
        .then((response) => {
          console.log(response, '생성 완료');
          handleClickClose();
          // eslint-disable-next-line no-restricted-globals
          location.reload();
        })
        .catch((error) => {
          console.log(error, '생성 error');
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
              label="스터디 이름"
              type="title"
              fullWidth
              variant="standard"
              onChange={handleName}
            />
          </div>
          <div>
            <div>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="관심분야"
                type="title"
                fullWidth
                variant="outlined"
                onChange={handleInterest}
              />
            </div>
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
