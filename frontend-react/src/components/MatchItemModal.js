import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import axios from 'axios';
import MatchingUpdate from './MatchItemUpdate';
import MatchingDetail from './MatchItemDetail';

// 글작성자 ? 수정/삭제/닫기 : 닫기    || 드랍다운(수정/삭제) 우측 상단 & 닫기 우측하단
// 수정창에서 닫기버튼 누르면 디테일로
export default function MatchItemModal({ pk, handleClickClose }) {
  const yourId = useSelector((state) => state.user.userInfo.id);
  const [item, setItem] = useState([]);
  const [mode, setMode] = useState(1);
  const goUpdate = () => {
    setMode(2);
  };
  const getItem = () => {
    axios
      .get(`/match/${pk}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((res) => {
        console.log(res.data, 'console');
        setItem(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert('존재하지 않는 글입니다');
        handleClickClose();
      });
  };
  useEffect(() => {
    getItem();
  }, []);
  const goDetail = () => {
    getItem();
    setMode(1);
    // item을 다시 가져옴
  };
  const setStateTrue = () => {
    axios
      .put(`/match/${item.articleId}?state=${true}&loginUserId=${yourId}`, [], {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then(() => {
        getItem();
      })
      .catch((err) => console.log(err));
  };
  const setStateFalse = () => {
    axios
      .put(
        `/match/${item.articleId}?state=${false}&loginUserId=${yourId}`,
        [],
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      )
      .then(() => {
        getItem();
      })
      .catch((err) => console.log(err));
  };
  const deleteItem = () => {
    axios.delete(`/match/${item.articleId}`);
    handleClickClose();
  };
  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="md"
        open
        aria-describedby="alert-dialog-slide-description"
      >
        {mode === 1 && <MatchingDetail item={item} />}
        {mode === 2 && <MatchingUpdate item={item} goDetail={goDetail} />}
        <DialogActions>
          {item.writerId === yourId && mode === 1 && (
            <div>
              {item.state === true && (
                <Button onClick={setStateFalse}>마감</Button>
              )}
              {item.state === false && (
                <Button onClick={setStateTrue}>모집</Button>
              )}
              <Button onClick={goUpdate}>수정</Button>
              <Button onClick={deleteItem}>삭제</Button>
            </div>
          )}
          <Button onClick={handleClickClose}>닫기</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
