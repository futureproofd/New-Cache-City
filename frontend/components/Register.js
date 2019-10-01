/* eslint-disable indent */
import React, { useReducer } from 'react';

import Form from '../styles/Form';
import registerReducer from './reducers/registerReducer';
import useRegistration from './hooks/useRegistration';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  loading: false,
  error: '',
  registered: false,
};

const Register = () => {
  const [state, dispatch] = useReducer(registerReducer, initialState);
  // API Registration Hook
  useRegistration(state.loading, { ...state });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'login' });
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <fieldset>
        <h2>Sign up for an Account</h2>
        <label htmlFor="email">
          Email
          <input
            type="email"
            placeholder="email"
            onChange={e => dispatch({
                type: 'input',
                name: 'email',
                value: e.target.value,
              })
            }
            value={state.email}
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            placeholder="Name"
            onChange={e => dispatch({
                type: 'input',
                name: 'name',
                value: e.target.value,
              })
            }
            value={state.name}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            placeholder="password"
            onChange={e => dispatch({
                type: 'input',
                name: 'password',
                value: e.target.value,
              })
            }
            value={state.password}
          />
        </label>
        <label htmlFor="password">
          Confirm Password
          <input
            type="password"
            placeholder="password"
            onChange={e => dispatch({
                type: 'input',
                name: 'confirmPassword',
                value: e.target.value,
              })
            }
            value={state.confirmPassword}
          />
        </label>
        <button type="submit">Sign Up!</button>
      </fieldset>
    </Form>
  );
};

export default Register;
