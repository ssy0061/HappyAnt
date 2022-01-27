import React, { useState } from 'react';

export default function MatchingUpdate(props) {
  const { pk } = props;

  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');
  const handleInputId = (e) => {
    setInputId(e.target.value);
  };
  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  return (
    <div>
      <h1>update1 {pk}</h1>
      <div>
        <label htmlFor="input_id">ID : </label>
        <input
          type="text"
          name="input_id"
          value={inputId}
          placeholder="E-mail을 입력해주세요"
          onChange={handleInputId}
        />
      </div>
      <div>
        <label htmlFor="input_pw">PW : </label>
        <input
          type="password"
          name="input_pw"
          value={inputPw}
          placeholder="비밀번호를 입력해주세요"
          onChange={handleInputPw}
        />
      </div>
    </div>
  );
}
