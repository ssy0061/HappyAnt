import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import StudyItemCreate from '../components/StudyItemCreate';

export default function Study() {
  const { studyId } = useParams();
  const [open3, setOpen3] = useState(false);
  const handleClickOpen3 = () => {
    setOpen3(true);
  };
  const handleClickClose3 = () => {
    setOpen3(false);
  };

  return (
    <div>
      <h1>{studyId}번 공간</h1>
      <p>afsfas</p>
      <button type="submit" onClick={handleClickOpen3}>
        스터디 글 작성
      </button>
      {open3 && <StudyItemCreate handleClickClose={handleClickClose3} />}
    </div>
  );
}
