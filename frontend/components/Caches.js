import React from 'react';
import Cache from './Cache';
import CacheList from '../styles/CacheList';
import useGetCaches from './hooks/useGetCaches';

const items = [
  { id: 1, name: 'cache1' },
  { id: 2, name: 'cache2' },
  { id: 3, name: 'cache3' },
];

const Caches = () => {
  // API Caches Hook
  const [res, getCaches] = useGetCaches('http://localhost:7888/api/caches');

  if (res.data) {
    console.log('data:', res.data);
  }

  return (
    <CacheList>
      {items.map(item => (
        <Cache item={item} key={item.id} />
      ))}
    </CacheList>
  );
};

export default Caches;
