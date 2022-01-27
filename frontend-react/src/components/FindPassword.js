import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

// 1단계 : email 기입 -> email 존재 확인후 존재하면 setLevel+1 || 버튼 : next버튼 닫기버튼
// 2단계 : 질문 리스트에서 선택 후 답변 기입 -> 해당 이메일에 기입된 정보가 맞으면 수정페이지로 이동 || 버튼 : prev / next / close
// 3단계 : 수정페이지에서 새로운 password 및 password_confirm 확인 후 valid하면 해당 유저의 정보수정 (PUT메서드)
export default function FindPassword(props) {
  // const open = true;
  const [level, setLevel] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { handleClickClose } = props;

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePrev = () => {
    if (level >= 1) {
      setLevel(level - 1);
    }
  };

  const emailCheck = () => {
    if (email === '') {
      console.log('빈 값 금지');
    } else {
      axios
        // DB에 이메일 존재하는지 확인하는 기능(백엔드) 필요
        .post(URL, '')
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      setLevel(level + 1);
    }
  };

  const questionCheck = () => {
    axios.post(URL, '');
    setLevel(level + 1);
  };

  // axios
  //   .get('/test?name=veneas')
  //   .then(function (response) {
  //     // 성공한 경우 실행
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     // 에러인 경우 실행
  //     console.log(error);
  //   })
  //   .then(function () {
  //     // 항상 실행
  //   });
  const submitNewPassword = () => {
    if (password !== passwordConfirm) {
      console.log('비번 안 맞음');
    } else {
      axios
        .put(URL, '데이터')
        .then((response) => {
          // 비번 변경 성공 메시지
          console.log(response);
        })
        .catch((error) => {
          // 비번 변경 실패 메시지
          console.log(error);
        });

      handleClickClose();
    }
  };

  // const submit = (res) => {
  //   axios.post()
  // }

  return (
    <div>
      <Dialog open>
        <DialogTitle>
          비밀번호 찾기[
          {level + 1}
          /3]
        </DialogTitle>
        <DialogContent>
          {level < 2 && (
            <div>
              <DialogContentText>
                비밀번호를 찾기 위해서 가입 이메일을 입력해주세요.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="E-mail Address"
                type="email"
                fullWidth
                variant="standard"
                onChange={handleEmail}
              />
            </div>
          )}

          {level === 1 && (
            <div>
              <br />
              <br />
              <br />
              <DialogContentText>
                비밀번호 찾기 질문을 입력해주세요.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Question"
                type="email"
                fullWidth
                variant="standard"
              />
              <br />
              <br />
              <br />
              <DialogContentText>
                질문에 대한 답을 적어주세요.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Answer"
                type="email"
                fullWidth
                variant="standard"
              />
            </div>
          )}

          {level === 2 && (
            <div>
              <DialogContentText>
                새로운 비밀번호를 입력해주세요
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Password"
                type="email"
                fullWidth
                variant="standard"
                onChange={handlePassword}
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Password Confirmation"
                type="email"
                fullWidth
                variant="standard"
                onChange={handlePasswordConfirm}
              />
            </div>
          )}

          {/* {level === 3 && <div></div>} */}
        </DialogContent>
        <DialogActions>
          {level > 0 && <Button onClick={handlePrev}>◀ Prev</Button>}
          {level === 0 && <Button onClick={emailCheck}>Next ▶</Button>}
          {level === 1 && <Button onClick={questionCheck}>Submit ▶</Button>}
          {level === 2 && <Button onClick={submitNewPassword}>Enter</Button>}
          <Button onClick={handleClickClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
