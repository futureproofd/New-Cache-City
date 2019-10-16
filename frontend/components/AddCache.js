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

/**
 * Note: The order of declaration matters here:
 * the callback function needs to be defined before being used in the useForm hook
 * the useForm hook needs to be declared before usePostAPI, in order to pass
 * the 'values' slice of state to the usePostAPI hook
 */
const AddCache = () => {
  // 1. useForm hook callback
  const submitCache = (e) => {
    if (e) e.preventDefault();
    addCache();
  };

  // 2. create hook
  const {
 values, errors, handleChange, handleSubmit 
} = useForm(
    submitCache,
    validate
  );

  // 3. API Registration Hook
  const [res, addCache] = usePostAPI(
    'http://localhost:7888/api/addCache',
    values
  );

  if (res.data) {
    return <Redirect to={res.data.redirectURI} />;
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <fieldset disabled={res.loading} aria-busy={res.loading}>
        <h2>Create a New Cache</h2>
        <ErrorMessage errors={res.errors} />
        <label htmlFor="name">
          Cache Name
          <input
            name="name"
            type="text"
            placeholder="Provide a name for others to see"
            required
            onChange={handleChange}
            value={values.name || ''}
          />
          <Message>{errors.name}</Message>
        </label>
        <label htmlFor="name">
          Description
          <input
            name="description"
            type="textarea"
            rows="3"
            placeholder="Provide some details about the Cache"
            required
            onChange={handleChange}
            value={values.description || ''}
          />
          <Message>{errors.name}</Message>
        </label>
        <label htmlFor="location">
          Location (Approximate Address)
          <input
            name="location"
            type="text"
            placeholder="location"
            required
            onChange={handleChange}
            value={values.location || ''}
          />
          <Message>{errors.location}</Message>
        </label>
        <label htmlFor="coordinates">
          GPS Coordinates
          <input
            name="Latitude"
            type="text"
            placeholder="latitude"
            readOnly
            required
            onChange={handleChange}
            value={values.latitude || ''}
          />
          <Message>{errors.latitude}</Message>
          <input
            name="longitude"
            type="text"
            placeholder="longitude"
            readOnly
            required
            onChange={handleChange}
            value={values.longitude || ''}
          />
          <Message>{errors.longitude}</Message>
        </label>
        <label htmlFor="photo">
          Optional Photo
          <input
            name="photo"
            type="file"
            accept="image/gif, image/png, image/jepg"
            placeholder="Add an optional photo"
            onChange={handleChange}
            value={values.photo || ''}
          />
          <Message>{errors.photo}</Message>
        </label>
        <button type="submit">Create Cache</button>
      </fieldset>
    </Form>
  );
};

export default AddCache;
