import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import StudyItemCreate from '../components/StudyItemCreate';
import StudyList from './StudyList';
import BtnEntrust from '../components/BtnEntrust';

export default function Study() {
  const { studyId } = useParams();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [open3, setOpen3] = useState(false);
  const [studyInfo, setStudyInfo] = useState('');
  const handleClickOpen3 = () => {
    setOpen3(true);
  };
  const handleClickClose3 = () => {
    setOpen3(false);
  };

  useEffect(() => {
    axios({
      method: 'get',
      url: `/study/${studyId}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((response) => {
        setStudyInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // ----------------------css-------------------
  const asideDiv = {
    width: '10%',
    height: '800px',
    paddingLeft: '.5rem',
    marginLeft: '.5rem',
    float: 'left',
    backgroundColor: '#f5f5f1',
  };

  const sectionDiv = {
    width: '75%',
    // backgroundColor: 'green',
    float: 'left',
    margin: '.5rem',
    marginRight: '2rem',
    padding: '.5rem',
  };

  return (
    <div id="wrapper">
      <aside style={asideDiv}>
        <p>aside content1</p>
        <p>aside2</p>
        <p>aside3</p>
        <p>aside4</p>
        <p>aside5</p>
        <p>aside6</p>
        <p>aside7</p>
        <p>aside8</p>
        {/* 리더에게만 위임/추방 보여주기 */}
        {studyInfo.leaderId === userInfo.userId ? (
          <BtnEntrust studyId={studyId} />
        ) : null}
      </aside>
      <section style={sectionDiv}>
        <h1>{studyId}번 공간</h1>
        <p>afsfas</p>
        <button type="submit" onClick={handleClickOpen3}>
          스터디 글 작성
        </button>
        <StudyList studyId={studyId} />
        {open3 && <StudyItemCreate handleClickClose={handleClickClose3} />}
      </section>
    </div>
  );
}
