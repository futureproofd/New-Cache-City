/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { FormStyle } from '../styles/FormStyle';

const CacheDetail = (props) => {
  const { item, user } = props.location.state;
  return (
    <FormStyle key={item.id}>
      <fieldset disabled={!user} aria-busy={false}>
        <label htmlFor="name">
          <input
            name="name"
            type="text"
            required
            onChange={() => console.log('user edit')}
            value={item.name}
          />
        </label>
        <img src={item.photo} alt={item.name} />
        <p>{item.description}</p>
        <h1>{` lat: ${item.location.coordinates[1]}, lng: ${item.location.coordinates[0]}`}</h1>
        <img
          alt="location"
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${item.location.coordinates[1]},${item.location.coordinates[0]}&zoom=14&size=800x150&key=${process.env.GOOGLE_API_KEY}&markers=${item.location.coordinates[1]},${item.location.coordinates[0]}&scale=2`}
        />
      </fieldset>
    </FormStyle>
  );
};

export default CacheDetail;
