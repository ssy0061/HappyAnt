import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import axios from 'axios';
import MatchingUpdate from './MatchingUpdate';
import MatchingDetail from './MatchingDetail';

// 글작성자 ? 수정/삭제/닫기 : 닫기    || 드랍다운(수정/삭제) 우측 상단 & 닫기 우측하단
// 수정창에서 닫기버튼 누르면 디테일로
export default function MatchingModal({ pk, handleClickClose }) {
  const [item, setItem] = useState([]);
  const [mode, setMode] = useState(1);
  const goUpdate = () => {
    setMode(2);
  };

  const getItem = () => {
    axios
      .get(`/match/${pk}`)
      .then((res) => {
        setItem(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getItem();
  }, []);

  const goDetail = () => {
    setMode(1);
    // item을 다시 가져옴
    getItem();
  };
  const setStateTrue = () => {
    axios
      .put(`/match/${item.id}?state=${1}`)
      .then(getItem())
      .catch((err) => console.log(err));
  };
  const setStateFalse = () => {
    axios
      .put(`/match/${item.id}?state=${0}`)
      .then(getItem())
      .catch((err) => console.log(err));
  };
  const deleteItem = () => {
    axios.delete(`/match/${item.id}`);
    handleClickClose();
  };

  return (
    <div>
      <Dialog fullWidth maxWidth="md" open>
        {mode === 1 && <MatchingDetail item={item} />}
        {mode === 2 && <MatchingUpdate item={item} goDetail={goDetail} />}
        <DialogActions>
          {item.state === false && <Button onClick={setStateTrue}>마감</Button>}
          {item.state === true && <Button onClick={setStateFalse}>모집</Button>}
          <Button onClick={goUpdate}>수정</Button>
          <Button onClick={deleteItem}>삭제</Button>
          <Button onClick={handleClickClose}>취소</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
