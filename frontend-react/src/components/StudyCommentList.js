// import React, { useState } from 'react';
// import axios from 'axios';
// // 스터디의 게시글 id 받아옴 -> 해당 id로 코멘트 리스트 조회 -> 코멘트 개수 2개이상이면 거기부터 <더보기>로 표시 -> 더보기 클릭시 댓글 리스트 모달창으로 보여주고 무한스크롤 구현
// export default function StudyCommentList(id) {
//   const [comment, setComment] = useState([]);

//   const getComment = () => {
//     axios.get(`/study/${id}/comment`).then((res) => setComment(res.data));
//   };
//   return (
//     <div>
//       <p>{a}</p>
//     </div>
//   );
// }
