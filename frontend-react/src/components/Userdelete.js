import axios from 'axios';
import React from 'react';

function Userdelete() {
  const onClick = () => {
    if (window.confirm('회원 탈퇴를 하시겠습니까?')) {
      // 여기서 삭제
      axios({
        method: 'delete',
        url: '경로랑 경로 안에 유저 :id',
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert('취소합니다.');
    }
  };

  return (
    <div>
      <button type="button" onClick={onClick}>
        회원 탈퇴
      </button>
    </div>
  );
}

export default Userdelete;
