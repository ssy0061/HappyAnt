import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import axios from 'axios';

export default function StudyCreateBtn() {
  const [open, setOpen] = useState(false);
  const [interest, setInterest] = useState('');
  const [name, setName] = useState('');
  const yourId = useSelector((state) => state.user.userInfo.userId);

  const handleInterest = (e) => {
    setInterest(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };

  const clickSubmitBtn = () => {
    const body = {
      interest,
      name,
    };
    axios
      .post('/study', body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        params: {
          loginUserId: yourId,
        },
      })
      .then(() => {
        alert(`${name}이 만들어졌어요.`);
        setOpen(false);
      })
      .catch(() => {
        alert(`${name}(이)가 만들어지지 않았어요`);
        setOpen(false);
      });
  };

  // -------------------------------- css------------------------------
  const DialogTitleDesign = {
    display: 'table',
    backgroundColor: '#001E60',
    textAlign: 'left',
    color: 'white',
    marginLeft: '1.5rem',
    borderBottomLeftRadius: '1.5rem',
    fontWeight: 'bold',
  };

  const DialogTitleText = {
    display: 'table-cell',
    verticalAlign: 'middle',
    marginTop: '0px',
    marginBottom: '0px',
  };
  const DialogTitleIcon = {
    display: 'table-cell',
    verticalAlign: 'middle',
    marginTop: '3px',
    marginRight: '-14px',
    marginBottom: '0px',
  };

  return (
    <div>
      <button type="submit" onClick={() => setOpen(true)}>
        스터디 생성하기
      </button>
      <Dialog open={open}>
        <DialogTitle style={DialogTitleDesign}>
          <LocalLibraryIcon sx={{ fontSize: 25 }} style={DialogTitleIcon} />
          <p style={DialogTitleText}>스터디 생성</p>
        </DialogTitle>
        <DialogContent>
          <br />
          <div>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="스터디의 이름을 써주세요."
              type="title"
              fullWidth
              variant="standard"
              onChange={handleName}
            />
            <TextField
              margin="dense"
              id="interest"
              label="어느 분야에 관심 있으신가요?"
              type="title"
              fullWidth
              variant="standard"
              onChange={handleInterest}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <button type="submit" onClick={clickSubmitBtn}>
            생성
          </button>
          <button type="submit" onClick={() => setOpen(false)}>
            닫기
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
