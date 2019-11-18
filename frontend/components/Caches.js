import React from 'react';
import Cache from './Cache';
import CacheList from '../styles/CacheList';
import useGetCaches from './hooks/useGetCaches';

const uri = process.env.DEV_API;

const Caches = () => {
  // API Caches Hook
  const [caches, getCaches] = useGetCaches(`${uri}caches`);

  return (
    <CacheList>
      {caches.data
        && caches.data.map(item => <Cache item={item} key={item.id} />)}
    </CacheList>
  );
};

export default Caches;
