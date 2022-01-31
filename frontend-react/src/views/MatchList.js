import axios from 'axios';
import React, { useEffect, useState } from 'react';

function MatchList() {
  // 원본 데이터
  const [list, setList] = useState([]);
  // 필터한 데이터
  const [filterList, setFilterList] = useState(list);
  // 검색 조건
  const [selected, setSelected] = useState('title');
  // 체크 박스
  const [checked, setChecked] = useState('');
  // 검색 버튼 클릭시 검색을 위한 데이터
  const [searchValue, setSearchValue] = useState('');

  // 최초 1번 데이터 불러오기
  useEffect(() => {
    axios({
      method: 'get',
      url: '/match',
    })
      .then((response) => {
        setList(response.data);
        setFilterList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 검색박스에 적힌 값을 저장함으로써 검색 버튼을 눌러도 검색이 가능하다.
  const saveSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  // 체크박스 모두 체크해제 시키기
  const selectCheckbox = () => {
    const checkboxes = document.getElementsByName('check');

    checkboxes.forEach((el) => {
      const ele = el;
      ele.checked = false;
    });
  };

  // 제목내용, 작성자로 검색
  const handleSearch = (event) => {
    // 제목,내용 으로 검색
    if (selected === 'title') {
      axios({
        method: 'get',
        url: `/match/search?Keyword=${event.target.value}`,
      })
        .then((res) => {
          console.log(res);
          setFilterList(res.data);
          selectCheckbox();
        })
        .catch((err) => console.log(err));
      // 작성자로 검색
    } else {
      const { value } = event.target;
      let result = [];
      console.log(value);
      result = list.filter((data) => data[selected].search(value) !== -1);

      setFilterList(result);
      selectCheckbox();
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
    console.log(event.target.value);
    setSelected(event.target.value);
  };

  // 체크박스 하나만 선택하게 하고 무엇을 선택했는지 데이터값 저장
  const handleCheckboxFiltering = (event) => {
    console.log(event);
    const element = event;
    selectCheckbox();
    element.target.checked = true;
    setChecked(element.target.id);
    console.log(checked);
  };

  // 체크박스로 필터링
  useEffect(() => {
    if (checked === 'all') {
      setFilterList(list);
    } else if (checked === 'ing') {
      let result = [];
      result = list.filter((data) => data.state === false);
      setFilterList(result);
    } else if (checked === 'done') {
      let result = [];
      result = list.filter((data) => data.state === true);
      setFilterList(result);
    }
  }, [checked]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '400px',
        textAlign: 'center',
      }}
    >
      <h1>Match</h1>
      <div>
        {/* 체크박스 */}
        <label htmlFor="all">전체</label>
        <input
          name="check"
          id="all"
          type="checkbox"
          onClick={handleCheckboxFiltering}
        />
        <label htmlFor="ing">모집중</label>
        <input
          name="check"
          id="ing"
          type="checkbox"
          onClick={handleCheckboxFiltering}
        />
        <label htmlFor="done">모집완료</label>
        <input
          name="check"
          id="done"
          type="checkbox"
          onClick={handleCheckboxFiltering}
        />
      </div>
      {/* 테이블 */}
      <table>
        <tbody>
          <tr>
            <th>작성자</th>
            <th>스터디명</th>
            <th>모집상태</th>
          </tr>
          {filterList.map((item) => (
            <tr key={item.articleId}>
              <td>{item.writerName}</td>
              <td style={{ cursor: 'pointer' }}>{item.title}</td>
              {item.status === true ? <td>모집완료</td> : <td>모집중</td>}
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      <div>
        {/* 검색 조건 select */}
        <select onChange={handleSelect}>
          <option value="title">제목</option>
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
    </div>
  );
}

export default MatchList;
