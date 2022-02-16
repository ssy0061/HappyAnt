import React, { useState } from 'react';
import axios from 'axios';
import InfoKospiKosdaq from '../components/InfoKospiKosdaq';
// import InfoKosdaq from '../components/InfoKosdaq';
import InfoDetail from '../components/InfoDetail';
import InfoSearch from '../components/InfoSearch';

function Info() {
  const [code, setCode] = useState('005930');
  const handletr = (stockName) => {
    console.log(stockName);
    axios
      .get(`/finance/code?stockName=${stockName}`)
      .then((res) => setCode(res.data))
      .catch((err) => console.log(err));
  };

  const getData = (data) => {
    setCode(data);
  };
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <InfoSearch getData={getData} />
        <InfoDetail detailData={code} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <InfoKospiKosdaq Infoname="kospi" ontr={handletr} />
        <InfoKospiKosdaq Infoname="kosdaq" ontr={handletr} />
      </div>
    </div>
  );
}

export default Info;
