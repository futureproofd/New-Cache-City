/* eslint-disable indent */
import React from 'react';
import { Redirect } from 'react-router-dom';
import useGetAPI from './hooks/useGetAPI';

const Logout = () => {
  // API Logout Hook
  const [res, logoutUser] = useGetAPI('http://localhost:7888/api/logout');

  const logout = () => {
    logoutUser();
  };

  if (res.data) {
    return <Redirect to={res.data.redirectURI} />;
  }

  return (
    <button type="button" onClick={logout}>
      Logout
    </button>
  );
};

export default Logout;
