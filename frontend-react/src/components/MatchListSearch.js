import React from 'react';

function MatchListSearch({
  handleSelect,
  searchValue,
  saveSearchValue,
  onKeyPress,
  handleSearch,
}) {
  return (
    <div>
      {/* 검색 조건 select */}
      <select onChange={handleSelect}>
        <option value="title">제목,내용</option>
        <option value="writerName">작성자</option>
      </select>
      <input
        type="text"
        value={searchValue}
        onChange={saveSearchValue}
        onKeyPress={onKeyPress}
      />
      <button type="button" value={searchValue} onClick={handleSearch}>
        검색
      </button>
    </div>
  );
}

export default MatchListSearch;
