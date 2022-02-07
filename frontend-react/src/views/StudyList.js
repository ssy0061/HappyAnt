import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MatchListSearch from '../components/MatchListSearch';

function StudyList() {
  // 나중에 구현 할때 스터디 목록에서 클릭할때 인자 넘겨주고 studyId에 넣기
  const [studyId] = useState('1');
  // 원본 데이터
  const [articleList, setArticleList] = useState([]);
  // 필터한 데이터
  const [filterList, setFilterList] = useState([]);
  useEffect(() => {
    axios({
      method: 'get',
      url: `/study/${studyId}`,
    })
      .then((res) => {
        setArticleList(res.data);
        setFilterList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 검색박스 코드 복사해오기
  //
  const [searchValue, setSearchValue] = useState('');
  const [selected, setSelected] = useState('title');

  // 검색박스에 적힌 값을 저장함으로써 검색 버튼을 눌러도 검색이 가능하다.
  const saveSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  // 제목내용, 작성자로 검색
  const handleSearch = (event) => {
    // 제목,내용 으로 검색
    if (selected === 'title') {
      axios({
        method: 'get',
        url: `/study/${studyId}/search?Keyword=${searchValue}`,
      })
        .then((res) => {
          setFilterList(res.data);
        })
        .catch((err) => console.log(err));
      // 작성자로 검색
    } else {
      const { value } = event.target;
      let result = [];

      result = articleList.filter(
        (data) => data[selected].search(value) !== -1
      );

      setFilterList(result);
    }
  };
  // 검색 엔터키 누를때
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  // 검색 조건
  const handleSelect = (event) => {
    setSelected(event.target.value);
  };
  //
  // 여기까지 검색박스 코드 복사붙여넣기

  // 무한 스크롤 구현해보기

  return (
    <div>
      <h1>StudyList</h1>
      <MatchListSearch
        handleSelect={handleSelect}
        searchValue={searchValue}
        saveSearchValue={saveSearchValue}
        onKeyPress={onKeyPress}
        handleSearch={handleSearch}
      />
      <div>
        {filterList.map((item) => (
          <div key={item.articleId}>
            <h1>{item.title}</h1>
            <p>{item.writerName}</p>
            <p>{item.content}</p>
            <p>{item.createDate}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudyList;
