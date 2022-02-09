import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function BtnEntrust(props) {
  const [memberList, setMemberList] = useState([]);
  const [selected, setSelected] = useState('');
  const Info = useSelector((state) => state.user.userInfo);

  const { studyId } = props;
  // 해당 스터디의 멤버 조회
  const member = () => {
    axios
      .get(`/study/${studyId}/member`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((res) => {
        setMemberList(res.data);
      })
      .catch((err) => {
        console.log(err, 'member error');
      });
  };
  useEffect(() => {
    member();
  }, []);
  console.log(memberList);

  const handleSelect = (e) => {
    setSelected(e.target.value);
    console.log(selected, 'select');
  };

  // 위임하기
  const onEntrust = (e) => {
    e.preventDefault();
    console.log('entrust');
    axios
      .post(
        `/study/${studyId}/member/${selected}/leader?loginUserId=${Info.userId}`,
        [],
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data, '위임완료');
      })
      .catch((err) => console.log(err, '위임 error'));
  };

  // 추방하기
  const onDeport = (e) => {
    e.preventDefault();
    console.log('onclick');
    axios
      .delete(
        `/study/${studyId}/member/${selected}?loginUserId=${Info.userId}`,
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
  console.log(selected);

  return (
    <div>
      <hr />
      <h4>위임 / 추방 기능</h4>
      <div>
        <select onChange={handleSelect} value={selected}>
          {memberList.map((item) => (
            <option value={item.userId} key={item.userId}>
              {item.userName}
            </option>
          ))}
        </select>
        <button type="submit" onClick={onEntrust}>
          위임하기
        </button>
        <button type="submit" onClick={onDeport}>
          추방하기
        </button>
        <hr />
        <p>
          Selected: <b>{selected}</b>
        </p>
      </div>
    </div>
  );
}
