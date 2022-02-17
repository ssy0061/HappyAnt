import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../css/Info.css';

function InfoKospiKosdaq({ ontr, Infoname }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/finance/${Infoname}`)
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
      <h2>{Infoname} TOP 50</h2>
      <table className="Infotable">
        <tbody>
          {data.map((item) => (
            <tr
              className="Infotr"
              key={item.no}
              onClick={() => {
                ontr(item.stockName);
                window.scrollTo(0, 0);
              }}
            >
              <td className="Infotd">{item.no}</td>
              <td className="Infotd">{item.stockName}</td>
              <td className="Infotd">&#8361;{item.curPrice}</td>

              {item.dayRange.includes('-') === true ? (
                <td className="Infotd InfoMinus">-&#8361;{item.diffAmount}</td>
              ) : null}
              {item.dayRange.includes('+') === true ? (
                <td className="Infotd InfoPlus">+&#8361;{item.diffAmount}</td>
              ) : null}
              {item.dayRange.includes('+') === false &&
              item.dayRange.includes('-') === false ? (
                <td className="Infotd">&#8361;{item.diffAmount}</td>
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
        </tbody>
      </table>
    </div>
  );
}

export default React.memo(InfoKospiKosdaq);
