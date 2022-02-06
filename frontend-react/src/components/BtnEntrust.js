import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function BtnEntrust() {
  const [MemberList, setMemberList] = useState('');
  const [Selected, setSelected] = useState('');
  // 임의 pk => 추후 props로 상위 컴포넌트에서 받아 올 것
  const pk = 1;
  const userId = 1;

  // 해당 스터디의 멤버 조회
  const member = () => {
    axios
      .get(`study/${pk}/member`)
      .then((res) => {
        console.log(res, '스터디원');
        setMemberList(res);
      })
      .catch((err) => console.log(err, 'member error'));
  };
  useEffect(() => {
    member();
  }, []);

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };
  // 위임하기
  const onEntrust = (e) => {
    e.preventDefault();
    console.log('onclick');
  };
  // 추방하기
  const onDeport = (e) => {
    e.preventDefault();
    console.log('onclick');
    axios
      .delete(`/study/${pk}/member/${userId}`)
      .then((res) => {
        console.log(res, '스터디원 추방');
      })
      .catch((err) => console.log(err, '추방 error'));
  };

  return (
    <div>
      <h1>위임 / 추방 기능</h1>
      <div>
        <select onChange={handleSelect} value={Selected}>
          {MemberList.map((item) => (
            <option value={item} key={item}>
              {item}
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
          Selected: <b>{Selected}</b>
        </p>
      </div>
    </div>
  );
}
