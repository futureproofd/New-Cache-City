import React from 'react';
import CacheStyle from '../styles/CacheStyle';

const Cache = ({ item }) => (
  <CacheStyle>
    <p>{item.name}</p>
    Im an item
  </CacheStyle>
);

export default Cache;
