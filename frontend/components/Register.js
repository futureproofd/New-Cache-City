/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
/* eslint-disable no-use-before-define */
/* eslint-disable indent */
import React from 'react';

import { Redirect } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import { Form, Message } from '../styles/Form';
import usePostAPI from './hooks/usePostAPI';
import useForm from './hooks/useForm';
import validate from './helpers/validator';

const uri = process.env.DEV_API;
/**
 * Note: The order of declaration matters here:
 * the callback function needs to be defined before being used in the useForm hook
 * the useForm hook needs to be declared before usePostAPI, in order to pass
 * the 'values' slice of state to the usePostAPI hook
 */
const Register = () => {
  // 1. useForm hook callback
  const submitUserRegistration = (e) => {
    if (e) e.preventDefault();
    registerUser();
  };

  // 2. create hook
  const {
 values, errors, handleChange, handleSubmit 
} = useForm(
    submitUserRegistration,
    validate
  );

  // 3. API Registration Hook
  const [res, registerUser] = usePostAPI(`${uri}register`, values);

  if (res.data) {
    return <Redirect to={res.data.redirectURI} />;
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <fieldset disabled={res.loading} aria-busy={res.loading}>
        <h2>Create an Account</h2>
        <ErrorMessage errors={res.errors} />
        <label htmlFor="email">
          Email (Your Account)
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
            value={values.email || ''}
          />
          <Message>{errors.email}</Message>
        </label>
        <label htmlFor="name">
          Name
          <input
            name="name"
            type="text"
            placeholder="Name"
            onChange={handleChange}
            value={values.name || ''}
          />
          <Message>{errors.name}</Message>
        </label>
        <label htmlFor="password">
          Password
          <input
            name="password"
            type="password"
            placeholder="password"
            onChange={handleChange}
            value={values.password || ''}
          />
          <Message>{errors.password}</Message>
        </label>
        <label htmlFor="password">
          Confirm Password
          <input
            name="confirmPassword"
            type="password"
            placeholder="password"
            onChange={handleChange}
            value={values.confirmPassword || ''}
          />
          <Message>{errors.confirmPassword}</Message>
        </label>
        <button type="submit">Sign Up!</button>
      </fieldset>
    </Form>
  );
};

export default Register;
