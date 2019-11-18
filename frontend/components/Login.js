/* eslint-disable indent */
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import usePostAPI from './hooks/usePostAPI';
import { FormStyle } from '../styles/FormStyle';

const uri = process.env.DEV_API;

const Login = () => {
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

  if (res.data) {
    return <Redirect to={res.data.redirectURI} />;
  }

  return (
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
  );
};

export default Login;
