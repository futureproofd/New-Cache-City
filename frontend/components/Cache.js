import React from 'react';
import { Link } from 'react-router-dom';
import CacheStyle from '../styles/CacheStyle';

const Cache = ({ item }) => (
  <CacheStyle key={item.id}>
    <Link to={{ pathname: '/cache', state: { item } }}>
      <h1>{item.name}</h1>
    </Link>
    <p>{item.description}</p>
    <img src={item.photo} alt={item.name} />
  </CacheStyle>
);

export default Cache;
