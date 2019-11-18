/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { FormStyle } from '../styles/FormStyle';

const CacheDetail = (props) => {
  const { item } = props.location.state;
  return (
    <FormStyle key={item.id}>
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <img src={item.photo} alt={item.name} />
    </FormStyle>
  );
};

export default CacheDetail;
