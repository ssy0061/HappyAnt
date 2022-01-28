import React from 'react';

function Checkstudy(props) {
  // eslint-disable-next-line react/destructuring-assignment
  const weekArr = props.name;
  console.log(weekArr);
  const rendering = () => {
    const result = [];
    for (let i = 0; i < weekArr.length; i += 1) {
      result.push(<p key={i}>{`${weekArr[i]} / `}</p>);
    }
    return result;
  };

  return <div>{rendering()}</div>;
}

export default Checkstudy;
