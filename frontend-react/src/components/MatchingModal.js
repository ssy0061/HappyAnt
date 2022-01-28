import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import MatchingUpdate from './MatchingUpdate';
import MatchingDetail from './MatchingDetail';

export default function MatchingModal({ pk, handleClickClose }) {
  const [mode, setMode] = useState(1);

  const handleMode = () => {
    setMode(2);
  };

  return (
    <div>
      <Dialog open>
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
