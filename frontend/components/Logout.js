/* eslint-disable indent */
import React from 'react';
import { Redirect } from 'react-router-dom';
import useGetAPI from './hooks/useGetAPI';
import usePostAPI from './hooks/usePostAPI';

const Logout = () => {
  // API Logout Hook
  const [res, logoutUser] = usePostAPI('http://localhost:7888/api/logout', {});

  const logout = () => {
    logoutUser();
  };

  if (res.data) {
    return <Redirect to={res.data.redirectURI} />;
  }

  return (
    <div>
      <button type="button" onClick={e => logout()}>

        Logout
</button>
    </div>
  );
};

export default Logout;
