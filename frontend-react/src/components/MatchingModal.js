import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import MatchingUpdate from './MatchingUpdate';
import MatchingDetail from './MatchingDetail';

// 글작성자 ? 수정/삭제/닫기 : 닫기    || 드랍다운(수정/삭제) 우측 상단 & 닫기 우측하단
// 수정창에서 닫기버튼 누르면 디테일로
export default function MatchingModal({ pk, handleClickClose }) {
  const [mode, setMode] = useState(1);

  const handleMode = () => {
    setMode(2);
  };

  return (
    <div>
      <Dialog fullWidth maxWidth="md" open>
        {mode === 1 && <MatchingDetail pk={pk} />}
        {mode === 2 && <MatchingUpdate pk={pk} />}
        <DialogActions>
          <Button onClick={handleMode}>수정</Button>
          <Button onClick={handleClickClose}>취소</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
