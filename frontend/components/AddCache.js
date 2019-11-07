/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable no-undef */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
/* eslint-disable no-use-before-define */
/* eslint-disable indent */
import React, { useState } from 'react';

import { Redirect } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import ErrorMessage from './ErrorMessage';
import GoogleMap from './Map';
import usePostAPI from './hooks/usePostAPI';
import useForm from './hooks/useForm';
import { validateNewCache } from './helpers/validator';
import useGetAPI from './hooks/useGetAPI';
import useDebounce from './hooks/useDebounce';
// styles
import { Form, Message } from '../styles/Form';
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
const uri = process.env.DEV_API;
const captchaKey = process.env.GOOGLE_RECAPTCHA;

const AddCache = () => {
  // 1. useForm hook callback
  const submitCache = (e) => {
    if (e) e.preventDefault();
    // call PostAPI method
    setCache();
  };

  // 2. create hook
  const {
 values, errors, handleChange, handleSubmit 
} = useForm(
    submitCache,
    validateNewCache
  );
  // debounce hook for location API - limit first call X seconds
  const debouncedValue = useDebounce(values.location, 200);

  // 3. API submit Hook
  const [res, setCache] = usePostAPI(`${uri}addcache`, values);

  // 3a. ReCaptcha validation hook
  const [validationRes, setValidationRes] = useState(true);

  /**
   * Map-related hooks
   */
  const [autocomplete, getAutocomplete] = useGetAPI(
    `${uri}autocomplete?q=${debouncedValue}`
  );

  const [coordinates, getCoordinates] = useGetAPI(`${uri}coordinates?q=`);
  const [open, setOpen] = useState(false);

  // map autocomplete
  const handleAutocomplete = (e) => {
    if (e) e.preventDefault();
    // first set form state, then use its value for debounce
    handleChange(e);
    // get google locaiton
    if (debouncedValue) {
      getAutocomplete();
      setOpen(!open);
    }
  };

  // Address selection and get coordinates
  const handleSelection = (e) => {
    // get synthetic pooled, async event properties (pass in values from dropdown button event)
    e.persist();
    if (e) e.preventDefault();
    // update location state for form submission
    handleChange({ [e.target.id]: e.target.innerHTML });
    // use google-generated result in query param
    getCoordinates(e.target.innerHTML);
    setOpen(false);
  };

  const handleRecaptcha = (e) => {
    setValidationRes(false);
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
          <Message>{errors.description}</Message>
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
            Refine Cache Location
            <label>
              <h1>
                Selection:
                {values.coordinates
                  && `lat: ${values.coordinates.lat}, lng: ${values.coordinates.lng}`}
              </h1>
            </label>
            <GoogleMap
              handler={handleChange}
              center={coordinates.data}
              name={values.name}
              value={values.coordinates}
            />
            <Message>{errors.coordinates}</Message>
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

        {coordinates.data && (
          <label>
            <ReCAPTCHA sitekey={captchaKey} onChange={handleRecaptcha} />
          </label>
        )}
        <button disabled={validationRes} type="submit">
          Create Cache
        </button>
      </fieldset>
    </Form>
  );
};

export default AddCache;
