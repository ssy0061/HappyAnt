import React, { useState } from 'react';
import MatchItemCreate from '../components/MatchItemCreate';
import MatchItemModal from '../components/MatchItemModal';
import StudyItemButton from '../components/StudyItemButton';
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
      <StudyItemButton />

      {open && <MatchItemCreate handleClickClose={handleClickCreateClose} />}
      {open2 && <MatchItemModal pk={1} handleClickClose={handleClickClose2} />}
    </div>
  );
}

export default Match;
