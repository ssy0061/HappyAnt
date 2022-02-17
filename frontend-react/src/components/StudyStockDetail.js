import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function StudyStockDetail({ stockCode }) {
  const [data, setData] = useState('');
  const [chart, setChart] = useState('1');

  useEffect(() => {
    axios
      .get(`/api/finance/${stockCode}`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [stockCode]);

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
    <div style={{ margin: 0 }}>
      <p>{data.time}</p>
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
      <div
        style={{ display: 'flex', marginBottom: '20px', marginLeft: '10px' }}
      >
        {chart === '1' && (
          <img src={data.dayChartUrl} alt="1일" width={450} height={200} />
        )}
        {chart === '2' && <img src={data.weekChartUrl} alt="1주일" />}
        {chart === '3' && <img src={data.month3ChartUrl} alt="3개월" />}
        {chart === '4' && <img src={data.yearChartUrl} alt="1년" />}
        {chart === '5' && <img src={data.year3ChartUrl} alt="3년" />}
        {chart === '6' && <img src={data.year5ChartUrl} alt="5년" />}
        {chart === '7' && <img src={data.year10ChartUrl} alt="10년" />}

        <table>
          <tbody>
            <tr>
              <td className="Infotd">현재가 : {data.curPrice}</td>
              {data.priceType === '상승' ? (
                <td className="Infotd">
                  등락률 : <span className="InfoPlus">+{data.dayRange}</span>
                </td>
              ) : (
                <td className="Infotd">
                  등락률 : <span className="InfoMinus">-{data.dayRange}</span>
                </td>
              )}
            </tr>
            <tr>
              {data.priceType === '상승' ? (
                <td className="Infotd">
                  전일비 : <span className="InfoPlus">+{data.diffAmount}</span>
                </td>
              ) : (
                <td className="Infotd">
                  전일비 : <span className="InfoMinus">-{data.diffAmount}</span>
                </td>
              )}
              <td className="Infotd">시가 : {data.marketPrice}</td>
            </tr>
            <tr>
              <td className="Infotd InfoPlus">고가 : {data.highPrice}</td>
              <td className="Infotd InfoMinus">저가 : {data.lowPrice}</td>
            </tr>
            <tr>
              <td className="Infotd">거래대금 : {data.tradingValue}</td>
              <td className="Infotd">거래량 : {data.volume}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
