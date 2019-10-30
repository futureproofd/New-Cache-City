/* eslint-disable no-undef */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
/* eslint-disable no-use-before-define */
/* eslint-disable indent */
import React, { useState } from 'react';

import { Redirect } from 'react-router-dom';
import GoogleMap from './Map';
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
import MapStyle from '../styles/MapStyle';
/**
 * Note: The order of declaration matters here:
 * the callback function needs to be defined before being used in the useForm hook
 * the useForm hook needs to be declared before usePostAPI, in order to pass
 * the 'values' slice of state to the usePostAPI hook
 */
const uri = process.env.DEV_API;

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
  const [res, addCache] = usePostAPI(uri, values);

  const [autocomplete, getAutocomplete] = useGetAPI(
    `${uri}autocomplete?q=${values.location}`
  );

  const [coordinates, getCoordinates] = useGetAPI(`${uri}coordinates?q=`);

  const [open, setOpen] = useState(false);

  const handleAutocomplete = (e) => {
    if (e) e.preventDefault();
    // usual form hook for submission
    handleChange(e);
    // get google locaiton
    if (values.location) {
      if (values.location.length >= 2) {
        getAutocomplete();
        setOpen(!open);
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
    // use google-generated result in query param
    getCoordinates(e.target.innerHTML);
    setOpen(false);
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
          General location
          <input
            name="location"
            type="text"
            placeholder="City, Park, Courtyard, Your favorite Tree"
            required
            onChange={handleAutocomplete}
            value={values.location || ''}
          />
          <SearchStyle>
            {open && (
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
            )}
          </SearchStyle>
          <Message>{errors.location}</Message>
        </label>

        {coordinates.data && (
          <label>
            Refine Cache location
            <MapStyle>
              <GoogleMap center={coordinates.data} name={values.name} />
            </MapStyle>
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
