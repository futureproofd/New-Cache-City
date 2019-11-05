/* eslint-disable react/no-array-index-key */
import React from 'react';
import Error from '../styles/Error';

const ErrorMessage = ({ errors }) => {
  if (!errors) return null;
  // express made
  if (typeof errors === 'string') {
    return (
      <Error>
        <p>
          <strong>{errors}</strong>
        </p>
      </Error>
    );
  }

  // express custom
  if (typeof errors.errors === 'string') {
    return (
      <Error>
        <p>
          <strong>{errors.errors}</strong>
        </p>
      </Error>
    );
  }
  // express custom
  if (typeof errors.errors === 'object') {
    return Object.values(errors.errors).map((err, i) => (
      <Error key={i}>
        <p>
          <strong>{`${err.name || err.param || 'Error'}: `}</strong>
          {err.message || err.msg || 'Server error'}
        </p>
      </Error>
    ));
  }

  // validation / database generated
  // database-related
  return Object.values(errors).map((err, i) => (
    <Error key={i}>
      <p>
        <strong>{`${err.name || err.param || 'Error'}: `}</strong>
        {err.message || err.msg || 'Server error'}
      </p>
    </Error>
  ));
};

export default ErrorMessage;
