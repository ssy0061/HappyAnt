import React from 'react';
import InfoKospi from '../components/InfoKospi';
import InfoKosdaq from '../components/InfoKosdaq';

function Info() {
  return (
    <div style={{ display: 'flex' }}>
      <InfoKospi />
      <InfoKosdaq />
    </div>
  );
}

export default Info;
