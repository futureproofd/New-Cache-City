/* eslint-disable indent */
import React, { useState } from 'react';

import { Redirect } from 'react-router-dom';
import Form from '../styles/Form';
import usePostAPI from './hooks/usePostAPI';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // API Registration Hook
  const [res, registerUser] = usePostAPI('http://localhost:7888/api/register', {
    name,
    email,
    password,
    confirmPassword,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };

  if (res.loading) {
    return <p>Loading</p>;
  }

  if (res.data) {
    return <Redirect to={res.data.redirectURI} />;
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <fieldset>
        <h2>Sign up for an Account</h2>
        <label htmlFor="email">
          Email (Your Account)
          <input
            type="email"
            placeholder="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            placeholder="Name"
            onChange={e => setName(e.target.value)}
            value={name}
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
        <label htmlFor="password">
          Confirm Password
          <input
            type="password"
            placeholder="password"
            onChange={e => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </label>
        <button type="submit">Sign Up!</button>
      </fieldset>
    </Form>
  );
};

export default Register;
