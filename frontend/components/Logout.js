/* eslint-disable indent */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { destroyUser } from '../actions';
import useGetAPI from './hooks/useGetAPI';

const uri = process.env.DEV_API;

const Logout = (props) => {
  // API Logout Hook
  const [res, logoutUser] = useGetAPI(`${uri}logout`);

  const logout = () => {
    logoutUser();
  };

  /**
   * dispatch an action to update our redux store to remove auth from global store
   * This could be achieved using the Context API, but the project was started with Redux
   * so it leverages both a global state (for user auth in this case) and Context in other areas
   */
  if (res.data) {
    props.destroyUser();
  }

  return (
    <>
      {res.data ? (
        <Redirect
          to={{
            pathname: `${res.data.redirectURI ? res.data.redirectURI : '/'}`,
            state: { auth: `${res.data.auth ? res.data.auth : false}` },
          }}
        />
      ) : null}
      <button type="button" onClick={logout}>
        Logout
      </button>
    </>
  );
};

export default connect(null, { destroyUser })(Logout);
