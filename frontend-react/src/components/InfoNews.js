import axios from 'axios';
import React, { useEffect, useState } from 'react';

function InfoNews({ newsData, nameData }) {
  const [allNews, setAllNews] = useState();

  const [todayKos, setTodayKos] = useState();
  const [toggle, setToggle] = useState('1');
  useEffect(() => {
    axios
      .get('/api/finance/news')
      .then((res) => {
        console.log(res);
        setAllNews(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get('/api/finance/today/stock')
      .then((res) => {
        console.log(res);

        setTodayKos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onKospi = () => {
    setToggle('1');
  };
  const onKosdaq = () => {
    setToggle('2');
  };
  const onKospi200 = () => {
    setToggle('3');
  };

  //  -----------------------------------------------------
  // const newsDiv = {
  //   display: 'flex',
  //   width: '1080px',
  //   justifyContent: 'space-evenly',
  //   // backgroundColor: '#eeeeee',
  //   border: '1px solid #c8c8c8',
  //   margin: 'auto',
  //   borderRadius: '10px',
  //   marginTop: '10px',
  // };

  // const newsMain = {
  //   width: '50%',
  //   margin: '0px',
  // };
  // const newsH2 = {
  //   display: 'inline',
  // };

  // const newsimg = {
  //   float: 'left',
  // };

  // const newsA = {
  //   color: 'black',
  //   textDecoration: 'none',
  //   marginTop: '10px',
  // };

  // const newsToday = {
  //   display: 'flex',
  //   justifyContent: 'space-evenly',
  // };
  // const newsTodayImg = {
  //   width: '400px',
  // };

  // const newsTodayPlusColor = {
  //   color: 'red',
  // };
  // const newsTodayMinusColor = {
  //   color: 'blue',
  // };

  // const newsTd = {
  //   borderBottom: '1px solid #aaaaaa',
  // };
  // -------------------------------------------------
  return (
    <div className="newsDiv">
      <div>
        <br />

        <h2 className="newsH2">{nameData}</h2>
        <span> 의 주요뉴스</span>
        <br />
        <br />
        {newsData &&
          newsData.map((item) => (
            <div key={item.url}>
              <a
                target="_blank"
                className="newsA"
                href={item.url}
                rel="noreferrer"
              >
                {item.articleSummary}
              </a>
            </div>
          ))}
        <br />
        <br />
        <h3>오늘의 증시</h3>
        <button onClick={onKospi} type="button">
          코스피
        </button>
        <button onClick={onKosdaq} type="button">
          코스닥
        </button>
        <button onClick={onKospi200} type="button">
          코스피200
        </button>
        {todayKos && toggle === '1' && todayKos.kospi.dayRange[0] === '+' ? (
          <div>
            <div className="newsToday">
              <p>{todayKos.kospi.name}</p>
              <p>{todayKos.kospi.price}</p>
              <p className="newsTodayPlusColor">
                {todayKos.kospi.variablePrice}
              </p>
              <p className="newsTodayPlusColor">{todayKos.kospi.dayRange}</p>
            </div>
            <img className="newsTodayImg" src={todayKos.kospi.img} alt="kos" />
          </div>
        ) : null}
        {todayKos && toggle === '1' && todayKos.kospi.dayRange[0] === '-' ? (
          <div>
            <div className="newsToday">
              <p>{todayKos.kospi.name}</p>
              <p>{todayKos.kospi.price}</p>
              <p className="newsTodayMinusColor">
                {todayKos.kospi.variablePrice}
              </p>
              <p className="newsTodayMinusColor">{todayKos.kospi.dayRange}</p>
            </div>
            <img className="newsTodayImg" src={todayKos.kospi.img} alt="kos" />
          </div>
        ) : null}
        {todayKos && toggle === '2' && todayKos.kosdaq.dayRange[0] === '+' ? (
          <div>
            <div className="newsToday">
              <p>{todayKos.kosdaq.name}</p>
              <p>{todayKos.kosdaq.price}</p>
              <p className="newsTodayPlusColor">
                {todayKos.kosdaq.variablePrice}
              </p>
              <p className="newsTodayPlusColor">{todayKos.kosdaq.dayRange}</p>
            </div>
            <img className="newsTodayImg" src={todayKos.kosdaq.img} alt="kos" />
          </div>
        ) : null}
        {todayKos && toggle === '2' && todayKos.kosdaq.dayRange[0] === '-' ? (
          <div>
            <div className="newsToday">
              <p>{todayKos.kosdaq.name}</p>
              <p>{todayKos.kosdaq.price}</p>
              <p className="newsTodayMinusColor">
                {todayKos.kosdaq.variablePrice}
              </p>
              <p className="newsTodayMinusColor">{todayKos.kosdaq.dayRange}</p>
            </div>
            <img className="newsTodayImg" src={todayKos.kosdaq.img} alt="kos" />
          </div>
        ) : null}
        {todayKos && toggle === '3' && todayKos.kospi200.dayRange[0] === '+' ? (
          <div>
            <div className="newsToday">
              <p>{todayKos.kospi200.name}</p>
              <p>{todayKos.kospi200.price}</p>
              <p className="newsTodayPlusColor">
                {todayKos.kospi200.variablePrice}
              </p>
              <p className="newsTodayPlusColor">{todayKos.kospi200.dayRange}</p>
            </div>
            <img
              className="newsTodayImg"
              src={todayKos.kospi200.img}
              alt="kos"
            />
          </div>
        ) : null}
        {todayKos && toggle === '3' && todayKos.kospi200.dayRange[0] === '-' ? (
          <div>
            <div className="newsToday">
              <p>{todayKos.kospi200.name}</p>
              <p>{todayKos.kospi200.price}</p>
              <p className="newsTodayMinusColor">
                {todayKos.kospi200.variablePrice}
              </p>
              <p className="newsTodayMinusColor">
                {todayKos.kospi200.dayRange}
              </p>
            </div>
            <img
              className="newsTodayImg"
              src={todayKos.kospi200.img}
              alt="kos"
            />
          </div>
        ) : null}
      </div>
      <div className="newsMain">
        <br />
        <h3 className="newsH2">오늘</h3> <span>주요뉴스</span>
        <br />
        <br />
        {allNews &&
          allNews.map((item) => (
            <div key={item.url} className="newsTd">
              <img className="newsImg" src={item.img} alt="주요뉴스" />

              <a
                target="_blank"
                className="newsA"
                href={item.url}
                rel="noreferrer"
              >
                <h4 className="newsH2">{item.articleSubject}</h4>
              </a>

              <p>
                <a
                  target="_blank"
                  className="newsA"
                  href={item.url}
                  rel="noreferrer"
                >
                  {item.articleSummary}
                </a>
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default InfoNews;
