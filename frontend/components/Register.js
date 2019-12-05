/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
/* eslint-disable no-use-before-define */
/* eslint-disable indent */
import React from 'react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';
import ErrorMessage from './ErrorMessage';
import { FormStyle, Message } from '../styles/FormStyle';
import usePostAPI from './hooks/usePostAPI';
import useForm from './hooks/useForm';
import { validateRegistration } from './helpers/validator';
import Container from '../styles/containers/Container';
import Card from '../styles/containers/Card';
import Flex from '../styles/containers/Flex';

const uri = process.env.DEV_API;
/**
 * Note: The order of declaration matters here:
 * the callback function needs to be defined before being used in the useForm hook
 * the useForm hook needs to be declared before usePostAPI, in order to pass
 * the 'values' slice of state to the usePostAPI hook
 */
const Register = (props) => {
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
    validateRegistration
  );

  // 3. API Registration Hook
  const [res, registerUser] = usePostAPI(`${uri}register`, values);

  // Redux action dispatch - make auth exists on global state for redirect
  if (res.data) {
    props.fetchUser();
  }

  return (
    <>
      {res.data ? (
        <Redirect
          to={{
            pathname: `${res.data.redirectURI ? res.data.redirectURI : '/'}`
          }}
        />
      ) : null}
      <Container>
        <Flex justifyCenter>
          <Card big>
            <FormStyle method="POST" onSubmit={handleSubmit}>
              <fieldset disabled={res.loading} aria-busy={res.loading}>
                <h2>Create an Account</h2>
                <ErrorMessage errors={res.errors} />
                <label htmlFor="email">
                  Email (Your Account)
                  <input
                    name="email"
                    type="email"
                    placeholder="e-mail address"
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
                    placeholder="Display name"
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
                    placeholder="8 Characters (Uppercase, Lowercase, Number, Special Char)"
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
                    placeholder="Confirm your password"
                    onChange={handleChange}
                    value={values.confirmPassword || ''}
                  />
                  <Message>{errors.confirmPassword}</Message>
                </label>
                <button type="submit">Sign Up!</button>
              </fieldset>
            </FormStyle>
          </Card>
        </Flex>
      </Container>
    </>
  );
};

export default connect(null, { fetchUser })(Register);
