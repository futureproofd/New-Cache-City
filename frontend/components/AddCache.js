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
import useGetAPI from './hooks/useGetAPI';
import {
  SearchStyle,
  DropDown,
  DropDownItem,
  DropDownButton
} from '../styles/SearchStyle';

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

  const [autocomplete, getAutocomplete] = useGetAPI(
    `http://localhost:7888/api/autocomplete?q=${values.location}`
  );

  const [coordinates, getCoordinates] = useGetAPI(
    `http://localhost:7888/api/coordinates?q=${values.location}`
  );

  const handleAutocomplete = (e) => {
    if (e) e.preventDefault();
    // usual form hook for submission
    handleChange(e);
    // get google locaiton
    if (values.location) {
      if (values.location.length >= 2) {
        getAutocomplete();
      }
    }
  };

  // Auto-complete address selection and coordinates
  const handleSelection = (e) => {
    // get synthetic pooled, async event properties (pass in values from dropdown button event)
    e.persist();
    if (e) e.preventDefault();
    // update location state
    handleChange({ name: e.target.id, value: e.target.innerHTML });
    getCoordinates();
  };

  if (res.data) {
    return <Redirect to={res.data.redirectURI} />;
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <fieldset
        disabled={res.loading}
        aria-busy={res.loading || autocomplete.loading}
      >
        <h2>Create a New Cache</h2>
        <ErrorMessage errors={res.errors} />
        <label htmlFor="name">
          Cache Name
          <input
            name="name"
            type="text"
            placeholder="Provide an intriguing Cache name"
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
          Location
          <input
            name="location"
            type="text"
            placeholder="City, Park, Courtyard, Your favorite Tree"
            required
            onChange={handleAutocomplete}
            value={values.location || ''}
          />
          <SearchStyle>
            <DropDown>
              {autocomplete.data
                && autocomplete.data.map(place => (
                  <DropDownItem key={place.id} value={place.description}>
                    <DropDownButton
                      id="location"
                      onClick={handleSelection}
                      type="button"
                      value={place.description}
                    >
                      {place.description}
                    </DropDownButton>
                  </DropDownItem>
                ))}
            </DropDown>
          </SearchStyle>
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

        {coordinates.data && (
          <label htmlFor="map">
            Exact Location
            <input
              name="map"
              type="text"
              placeholder="map stuff here"
              value="todo"
              onChange={e => console.log(e, 'todo')}
            />
          </label>
        )}

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
