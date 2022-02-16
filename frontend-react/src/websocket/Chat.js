import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
// import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import SockJsClient from 'react-stomp';
import { Fab, Input, Box } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

export default function Chat() {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState('');
  const loginCheck = useSelector((state) => state.user.isLogin);
  const yourId = useSelector((state) => state.user.userInfo.userId);
  const $websocket = useRef(null);
  const studyId = useParams();

  const handleClickSendTo = (e) => {
    if (e.key === 'Enter' && content !== '') {
      setContent('');
      $websocket.current.sendMessage(
        `/study/${studyId}`,
        JSON.stringify({
          userId: yourId,
          content: e.target.value,
        })
      );
    }
  };
  const handleContent = (e) => {
    setContent(e.target.value);
  };

  // 서버로부터 메시지가 왔을 때 실행되는 부분
  const onAlert = (msg) => {
    console.log('메시지옴');
    document.getElementById('chatLog').append(`${msg.content}`);
  };

  // -----------------------------css---------------------------------
  const chatIconPosition = {
    position: 'fixed',
    right: '20px',
    bottom: '20px',
  };
  const chatItemViisible = {
    visibility: 'visible',
    opacity: '90%',
    width: '300px',
    height: '400px',
    background: 'white',
    position: 'fixed',
    right: '20px',
    bottom: '80px',
    border: '1px solid',
    borderRadius: '10px',
    padding: '10px',
  };
  const chatItemInvisible = {
    visibility: 'hidden',
    width: '0px',
    height: '0px',
    position: 'fixed',
  };

  const chatLogStyle = {
    width: '300px',
    height: '335px',
  };

  const chatInputStyle = {};

  return (
    <div>
      {loginCheck && (
        <div>
          <Fab
            style={chatIconPosition}
            size="medium"
            color="secondary"
            aria-label="chat"
            onClick={() => setShow(!show)}
          >
            <ChatBubbleOutlineIcon />
          </Fab>
          <div style={show ? chatItemViisible : chatItemInvisible}>
            <Box id="chatLog" style={chatLogStyle}>
              <p>study name</p>
            </Box>
            <div style={chatInputStyle}>
              <Input
                placeholder="댓글을 입력해주세요."
                size="small"
                autoFocus
                fullWidth
                onKeyPress={handleClickSendTo}
                onChange={handleContent}
                value={content}
              />
            </div>
          </div>
          <SockJsClient
            url="http://i6d207.p.ssafy.io/api/happy-ant-websocket"
            topics={[`/study/${studyId}`]}
            onMessage={onAlert}
            ref={$websocket}
          />
        </div>
      )}
    </div>
  );
}
