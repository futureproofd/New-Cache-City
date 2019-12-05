/* eslint-disable indent */
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ErrorMessage from './ErrorMessage';
import usePostAPI from './hooks/usePostAPI';
import { FormStyle } from '../styles/FormStyle';
import { fetchUser } from '../actions';
import Container from '../styles/containers/Container';
import Card from '../styles/containers/Card';
import Flex from '../styles/containers/Flex';

const uri = process.env.DEV_API;

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // API Login Hook
  const [res, loginUser] = usePostAPI(`${uri}login`, {
    email,
    password,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  /**
   * dispatch an action to update our redux store with the authenticated user
   * This could be achieved using the Context API, but the project was started with Redux
   * so it leverages both a global state and Context in other areas
   */
  if (res.data) {
    props.fetchUser();
  }

  return (
    <>
      {res.data ? (
        <Redirect
          to={{
            pathname: `${res.data.redirectURI ? res.data.redirectURI : '/'}`,
          }}
        />
      ) : null}
      <Container>
        <Flex justifyCenter>
          <Card big>
            <FormStyle method="POST" onSubmit={handleSubmit}>
              <fieldset disabled={res.loading} aria-busy={res.loading}>
                <h2>Login</h2>
                <ErrorMessage errors={res.errors} />
                <label htmlFor="email">
                  Login (Your Email)
                  <input
                    type="email"
                    placeholder="email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                  />
                </label>
                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    placeholder="password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                  />
                </label>
                <button type="submit">Login</button>
              </fieldset>
            </FormStyle>
          </Card>
        </Flex>
      </Container>
    </>
  );
};

export default connect(null, { fetchUser })(Login);
