import React from 'react';
import { useSelector } from 'react-redux';

function Profile() {
  const test = useSelector((state) => state.user.userInfo);

  return (
    <div>
      <h1>{test.name}의 Profile</h1>
    </div>
  );
}

export default Profile;
