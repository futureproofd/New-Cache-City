/* eslint-disable indent */
import React from 'react';
import axios from 'axios';
import Form from '../styles/Form';

const Account = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get('http://localhost:7888/api/account', { withCredentials: true })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <fieldset>
        <h2>Account Details</h2>
        <label htmlFor="email">
          Email (Your Account)
          <input
            type="text"
            readOnly="true"
            placeholder="email"
            value="dummy"
          />
        </label>
        <label htmlFor="name">
          Name
          <input type="text" placeholder="Name" value="dummy" />
        </label>
        <button type="submit">Save changes</button>
      </fieldset>
    </Form>
  );
};

export default Account;
