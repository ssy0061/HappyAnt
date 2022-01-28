import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Userdelete() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userInfo);
  const onClick = () => {
    if (window.confirm('회원 탈퇴를 하시겠습니까?')) {
      // 여기서 삭제
      axios({
        method: 'delete',
        url: `/delete/${user.id}`,
      })
        .then((response) => {
          console.log(response);
          navigate('/login');
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
