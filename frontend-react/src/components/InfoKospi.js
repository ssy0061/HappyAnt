import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../css/Info.css';

function InfoKospi() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('/finance/kospi', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(data);
  return (
    <div>
      <h1>kospi 상위 50개</h1>
      <table className="Infotable">
        {data.map((item) => (
          <tr className="Infotr" key={item.no}>
            <td className="Infotd">{item.no}</td>
            <td className="Infotd">{item.stockName}</td>
            <td className="Infotd">{item.curPrice}</td>

            {item.dayRange.includes('-') === true ? (
              <td className="Infotd InfoMinus">{item.diffAmount}</td>
            ) : null}
            {item.dayRange.includes('+') === true ? (
              <td className="Infotd InfoPlus">{item.diffAmount}</td>
            ) : null}
            {item.dayRange.includes('+') === false &&
            item.dayRange.includes('-') === false ? (
              <td className="Infotd">{item.diffAmount}</td>
            ) : null}

            {item.dayRange.includes('-') === true ? (
              <td className="Infotd InfoMinus">{item.dayRange}</td>
            ) : null}
            {item.dayRange.includes('+') === true ? (
              <td className="Infotd InfoPlus">{item.dayRange}</td>
            ) : null}
            {item.dayRange.includes('+') === false &&
            item.dayRange.includes('-') === false ? (
              <td className="Infotd">{item.dayRange}</td>
            ) : null}

            {/* <td className="Infotd">{item.diffAmount}</td>
            <td className="Infotd">{item.dayRange}</td> */}
          </tr>
        ))}
      </table>
    </div>
  );
}

export default InfoKospi;
