import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import MatchListSearch from '../components/MatchListSearch';
import StudyCommentList from '../components/StudyCommentList';
import StudyItemDelete from '../components/StudyItemDelete';
import StudyItemUpdate from '../components/StudyItemUpdate';

function StudyList(props) {
  // 나중에 구현 할때 스터디 목록에서 클릭할때 인자 넘겨주고 studyId에 넣기
  const { studyId } = props;
  const { refresh } = props;
  // 원본 데이터
  const [articleList, setArticleList] = useState([]);
  // 필터한 데이터
  const [filterList, setFilterList] = useState([]);

  // 무한스크롤
  const [prev] = useState(0);
  const [curr, setCurr] = useState(5);
  const [thisState, setThisState] = useState(false);

  useEffect(() => {
    axios({
      method: 'get',
      url: `/study/${studyId}/article`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((res) => {
        console.log(res);
        setArticleList(res.data.reverse());
        setFilterList(res.data.slice(prev, curr));
        setCurr((cur) => cur + 5);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);
  //

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
        url: `/study/${studyId}/article/search?Keyword=${searchValue}`,
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
    } else if (selected === 'writerName' && event.target.value !== '') {
      axios({
        method: 'get',
        url: `/study/${studyId}/article/search/writer?name=${searchValue}`,
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

      // const { value } = event.target;
      // let result = [];

      // result = articleList.filter(
      //   (data) => data[selected].search(value) !== -1
      // );

      // setFilterList(result);
      // setThisState(true);
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
  const { ref, inView } = useInView({ threshold: 0.5 });
  useEffect(() => {
    if (inView && !thisState) {
      console.log(filterList);
      const items = articleList.slice(prev, curr);
      setCurr(curr + 5);
      setFilterList(items);
      console.log(prev, curr);
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
            <StudyItemDelete articleId={item.articleId} />
            <StudyItemUpdate articleId={item.articleId} />
            <hr />
            <StudyCommentList articleId={item.articleId} />
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
