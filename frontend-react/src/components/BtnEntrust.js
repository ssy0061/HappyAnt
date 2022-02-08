import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function BtnEntrust() {
  const [memberList, setMemberList] = useState('');
  const [selected, setSelected] = useState('');
  // 임의 스터디 pk => 추후 props로 상위 컴포넌트에서 받아 올 것
  const pk = 1;
  console.log('멤버axios전');
  // 해당 스터디의 멤버 조회
  const member = () => {
    axios
      .get(`study/${pk}/member`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((res) => {
        console.log(res, '스터디원');
        setMemberList(res);
      })
      .catch((err) => console.log(err, 'member error'));
  };
  useEffect(() => {
    member();
  }, []);
  console.log(memberList);

  const handleSelect = (e) => {
    setSelected(e.target.value);
    console.log(selected);
  };

  // 위임하기
  const onEntrust = (e) => {
    e.preventDefault();
    console.log('entrust');
    // axios
    //   .post(`/study/${pk}/member/${selected}/leader`)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.log(err, '위임 error'));
  };

  // 추방하기
  const onDeport = (e) => {
    e.preventDefault();
    console.log('onclick');
    // axios
    //   .delete(`/study/${pk}/member/${selected}`)
    //   .then((res) => {
    //     console.log(res, '스터디원 추방');
    //   })
    //   .catch((err) => console.log(err, '추방 error'));
  };

  return (
    <div>
      <h1>위임 / 추방 기능</h1>
      <div>
        <select onChange={handleSelect} value={selected}>
          {memberList.map((item) => (
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
          Selected: <b>{selected}</b>
        </p>
      </div>
    </div>
  );
}
