import axios from 'axios';
import React, { useState, useEffect } from 'react';

function InfoKosdaq() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('/stock/kosdaq', {
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
      <h1>KOSDAQ TOP 50</h1>

      <table>
        {data.map((item) => (
          <tr key={item.no}>
            <td>{item.no}</td>
            <td>{item.stockName}</td> <td>{item.curPrice}</td>
            <td>{item.diffAmount}</td> <td>{item.dayRange}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default InfoKosdaq;
