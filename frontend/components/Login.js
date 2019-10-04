/* eslint-disable indent */
import React from 'react';
import axios from 'axios';
import Form from '../styles/Form';

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    axios
      .get('http://localhost:7888/api/account', { withCredentials: true })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <fieldset>
        <h2>Login</h2>
        <label htmlFor="email">
          Login (Your Email)
          <input type="text" placeholder="email" />
        </label>
        <label htmlFor="password">
          Password
          <input type="password" placeholder="password" />
        </label>
        <button type="submit">Login</button>
      </fieldset>
    </Form>
  );
};

export default Login;
