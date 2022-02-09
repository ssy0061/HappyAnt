import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';

export default function BtnEntrust(props) {
  const Info = useSelector((state) => state.user.userInfo);
  const { studyId } = props;

  // 탈퇴하기
  const onDelete = (e) => {
    e.preventDefault();
    console.log('onclick');
    axios
      .delete(
        `/study/${studyId}/member/${Info.userId}?loginUserId=${Info.userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      )
      .then((res) => {
        console.log(res, '스터디원 추방');
      })
      .catch((err) => console.log(err, '추방 error'));
  };

  return (
    <div>
      <hr />
      <h4>탈퇴하기</h4>
      <button type="submit" onClick={onDelete}>
        탈퇴하기
      </button>
    </div>
  );
}
