import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import StudyItemCreate from '../components/StudyItemCreate';
import MatchItemCreate from '../components/MatchItemCreate';
import Chat from '../websocket/Chat';
import StudyList from './StudyList';
import BtnEntrust from '../components/BtnEntrust';
import BtnDelete from '../components/BtnDelete';
import BtnInvite from '../components/BtnInvite';
import StudyMemberInvite from '../components/StudyMemberInvite';
import BtnChangeStudyInfo from '../components/BtnChangeStudyInfo';

export default function Study() {
  const { studyId } = useParams();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [open3, setOpen3] = useState(false);
  const [studyInfo, setStudyInfo] = useState('');
  const [studyMember, setMemberInfo] = useState('');
  const [refresh, setRefresh] = useState(false);
  const handleClickOpen3 = () => {
    setOpen3(true);
  };
  const handleClickClose3 = () => {
    setOpen3(false);
    setRefresh(!refresh);
  };

  useEffect(() => {
    axios({
      method: 'get',
      url: `/api/study/${studyId}`,
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

  useEffect(() => {
    axios({
      method: 'get',
      url: `/api/study/${studyId}/member`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((response) => {
        setMemberInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(studyInfo, 'studyInfo');
  console.log(studyMember, 'studyMember');
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
      <Chat />
      <aside style={asideDiv}>
        <p>aside content1</p>
        <p>aside2</p>

        {/* 리더에게만 위임/추방 보여주기 */}
        {studyInfo.leaderId === userInfo.userId ? (
          <BtnEntrust studyId={studyId} />
        ) : null}
        {studyInfo.leaderId === userInfo.userId ? (
          <div>
            <BtnInvite studyInfo={studyInfo} studyMember={studyMember} />
            <StudyMemberInvite />
          </div>
        ) : null}
        {studyInfo.leaderId === userInfo.userId ? (
          <BtnChangeStudyInfo studyInfo={studyInfo} />
        ) : null}
        <BtnDelete studyId={studyId} />
      </aside>
      <section style={sectionDiv}>
        <h1>스터디 이름 : {studyInfo.studyName}</h1>
        <h1>{studyId}번 공간</h1>
        <MatchItemCreate />
        <button type="submit" onClick={handleClickOpen3}>
          스터디 글 작성
        </button>
        <StudyList studyId={studyId} refresh={refresh} />
        {open3 && <StudyItemCreate handleClickClose={handleClickClose3} />}
      </section>
    </div>
  );
}
