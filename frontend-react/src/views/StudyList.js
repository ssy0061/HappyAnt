import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import MatchListSearch from '../components/MatchListSearch';

function StudyList(props) {
  // 나중에 구현 할때 스터디 목록에서 클릭할때 인자 넘겨주고 studyId에 넣기
  const { studyId } = props;
  // 원본 데이터
  const [articleList, setArticleList] = useState([]);
  // 필터한 데이터
  const [filterList, setFilterList] = useState([]);

  // 무한스크롤
  const [prev, setPrev] = useState(0);
  const [curr, setCurr] = useState(20);
  const [thisState, setThisState] = useState(false);
  //

  useEffect(() => {
    axios({
      method: 'get',
      url: `/study/${studyId}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((res) => {
        // console.log(res.data.reverse());
        setArticleList(res.data.reverse());
        setFilterList(res.data.slice(prev, curr));
        // setFilterList(res.data);
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
    if (selected === 'title' && event.target.value !== '') {
      console.log(event);
      axios({
        method: 'get',
        url: `/study/${studyId}/search?Keyword=${searchValue}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then((res) => {
          console.log(res);
          setFilterList(res.data.reverse());
          setThisState(true);
        })
        .catch((err) => console.log(err));
      // 작성자로 검색
    } else if (event.target.value !== '') {
      const { value } = event.target;
      let result = [];

      result = articleList.filter(
        (data) => data[selected].search(value) !== -1
      );

      setFilterList(result);
      setThisState(true);
    } else {
      alert('검색어를 입력하세요');
    }
  };
  // 검색 엔터키 누를때
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log(e);
      handleSearch(e);
    }
  };

  // 검색 조건
  const handleSelect = (event) => {
    setSelected(event.target.value);
  };

  // 무한스크롤 라이브러리 활용
  const { ref, inView } = useInView({ threshold: 0 });
  useEffect(() => {
    if (inView && !thisState) {
      console.log(filterList);
      setPrev(curr);
      setCurr((current) => current + 20);
      const items = articleList.slice(prev, curr);
      console.log('hi');
      setFilterList(filterList.concat(items));
    }
  }, [inView]);
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1>StudyList</h1>
        <MatchListSearch
          handleSelect={handleSelect}
          searchValue={searchValue}
          saveSearchValue={saveSearchValue}
          onKeyPress={onKeyPress}
          handleSearch={handleSearch}
        />
        {filterList.map((item) => (
          <div style={{ width: '50%' }} key={item.articleId}>
            <h1>{item.title}</h1>
            <span>{item.articleId}</span>
            <p>{item.writerName}</p>
            <p>{item.content}</p>
            <p>{`${item.createDate.slice(0, 10)} ${item.createDate.slice(
              11
            )}`}</p>
            <hr />
          </div>
        ))}
      </div>

      <div ref={ref} />
      <hr />
    </div>
  );
}

export default StudyList;
