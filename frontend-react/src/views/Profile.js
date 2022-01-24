import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Btnguide from './Btnguide';
import Btnchangeprofile from './Btnchangeprofile';

function Profile() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://127.0.0.1:8000/account/${userId}`,
    })
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <Btnguide />
      <Btnchangeprofile />
      <h1>
        {profile.name}
      </h1>
    </div>
  );
}

export default Profile;
