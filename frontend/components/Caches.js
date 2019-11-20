import React from 'react';
import { connect } from 'react-redux';
import Cache from './Cache';
import CacheList from '../styles/CacheList';
import useGetCaches from './hooks/useGetCaches';

const uri = process.env.DEV_API;

const Caches = ({ auth }) => {
  // API Caches Hook
  const [caches, getCaches] = useGetCaches(`${uri}caches`);

  return (
    <CacheList>
      {caches.data
        && caches.data.map((item, i) => (
          <Cache user={auth} item={item} key={item._id} />
        ))}
    </CacheList>
  );
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Caches);
