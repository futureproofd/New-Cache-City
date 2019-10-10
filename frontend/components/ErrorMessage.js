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

  // validation generated
  return Object.values(errors.errors).map((err, i) => (
    <Error key={i}>
      <p>
        <strong>{`${err.param}: `}</strong>
        {err.msg}
      </p>
    </Error>
  ));
};

export default ErrorMessage;
