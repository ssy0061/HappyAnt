import React, { useState } from 'react';
import MatchingCreate from '../components/MatchingCreate';
import MatchingModal from '../components/MatchingModal';
import MatchList from './MatchList';

function Match() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const handleClickCreateOpen = () => {
    setOpen(true);
  };
  const handleClickCreateClose = () => {
    setOpen(false);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClickClose2 = () => {
    setOpen2(false);
  };

  return (
    <div>
      <h1>Match</h1>
      <MatchList />
      <button type="submit" onClick={handleClickCreateOpen}>
        글 작성
      </button>
      <button type="submit" onClick={handleClickOpen2}>
        디테일 임시
      </button>
      {open && <MatchingCreate handleClickClose={handleClickCreateClose} />}
      {open2 && <MatchingModal pk={3} handleClickClose={handleClickClose2} />}
    </div>
  );
}

export default Match;
