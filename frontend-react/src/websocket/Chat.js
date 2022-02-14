// import React, { useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import SockJsClient from 'react-stomp';

// export default function Chat() {
//   const userId = useSelector((state) => state.user.userInfo.userId);
//   const $websocket = useRef(null);
//   const dispatch = useDispatch();
//   const studyId = useParams();

//   // const handleMsg = (msg) => {
//   //   console.log(msg);
//   // };

//   // const handleClickSendTo = () => {
//   //   $websocket.current.sendMessage('/sendTo');
//   // };

//   // const handleClickSendTemplate = () => {
//   //   $websocket.current.sendMessage('/Te');
//   // };

//   // 서버로부터 메시지가 왔을 때 실행되는 부분
//   const onAlert = (msg) => {
//     console.log(msg.content);
//   };

//   return (
//     <div>
//       <SockJsClient
//         url="http://localhost:8080/happy-ant-websocket"
//         topics={[`/study/${studyId}`]}
//         onMessage={onAlert}
//         ref={$websocket}
//       />
//     </div>
//   );
// }
