import React, { useEffect, useState } from 'react';
import axios from 'axios';

function InfoDetail({ detailData }) {
  const [data, setData] = useState('');
  const [chart, setChart] = useState('1');

  useEffect(() => {
    axios
      .get(`/finance/${detailData}`)
      .then((res) => {
        setData(res.data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, [detailData]);

  const onDay = () => {
    setChart('1');
  };
  const onWeek = () => {
    setChart('2');
  };
  const onMonth3 = () => {
    setChart('3');
  };
  const onYear = () => {
    setChart('4');
  };
  const onYear3 = () => {
    setChart('5');
  };
  const onYear5 = () => {
    setChart('6');
  };
  const onYear10 = () => {
    setChart('7');
  };

  return (
    <div>
      <p>이름 : {data.stockName}</p>
      <p>기준시간 : {data.time}</p>
      <button onClick={onDay} type="button">
        1일
      </button>
      <button onClick={onWeek} type="button">
        1주일
      </button>
      <button onClick={onMonth3} type="button">
        3개월
      </button>
      <button onClick={onYear} type="button">
        1년
      </button>
      <button onClick={onYear3} type="button">
        3년
      </button>
      <button onClick={onYear5} type="button">
        5년
      </button>
      <button onClick={onYear10} type="button">
        10년
      </button>
      <div style={{ display: 'flex' }}>
        <div>
          {chart === '1' && <img src={data.dayChartUrl} alt="1일" />}
          {chart === '2' && <img src={data.weekChartUrl} alt="1주일" />}
          {chart === '3' && <img src={data.month3ChartUrl} alt="3개월" />}
          {chart === '4' && <img src={data.yearChartUrl} alt="1년" />}
          {chart === '5' && <img src={data.year3ChartUrl} alt="3년" />}
          {chart === '6' && <img src={data.year5ChartUrl} alt="5년" />}
          {chart === '7' && <img src={data.year10ChartUrl} alt="10년" />}
        </div>

        <table>
          <tbody>
            <tr>
              <td>현재가 : {data.curPrice}</td>
              <td>등락률 : {data.dayRange}</td>
            </tr>
            <tr>
              <td>전일비 : {data.diffAmount}</td>
              <td>시가 : {data.marketPrice}</td>
            </tr>
            <tr>
              <td>고가 : {data.highPrice}</td>
              <td>저가 : {data.lowPrice}</td>
            </tr>
            <tr>
              <td>상태 : {data.priceType}</td>
              <td>거래대금 : {data.tradingValue}</td>
            </tr>
            <tr>
              <td>거래량 : {data.volume}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InfoDetail;
