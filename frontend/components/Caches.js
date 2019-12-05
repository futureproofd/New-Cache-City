/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { useUserValue } from '../context/UserContext';
import Cache from './Cache';
import Flex from '../styles/containers/Flex';
import Container from '../styles/containers/Container';
import Card from '../styles/containers/Card';
import useGetCaches from './hooks/useGetCaches';
import PagerImpl from './PagerImpl';

const uri = process.env.DEV_API;

const Caches = ({ auth }) => {
  const [pageNum, setPage] = useState(1);
  // API Caches Hook
  const [caches, getCaches] = useGetCaches(`${uri}caches?page=${pageNum}`);
  const [{ settings }, dispatch] = useUserValue();

  /**
   *
   * @param {cursor} int the updated page number'
   * sets local page state
   * dispatches Global state change for user setting
   */
  const onPageChange = (cursor) => {
    setPage(cursor);
    dispatch({
      type: 'changeSettings',
      newSettings: { cachePage: cursor },
    });
  };

  return (
    <Container tight>
      {caches.data && (
        <Fragment>
          <Flex justifyCenter>
            <PagerImpl
              pagesCount={caches.data ? caches.data.totalPages : 1}
              cursor={caches.data ? settings.cachePage : 1}
              onPageChange={cursor => onPageChange(cursor)}
              loading={caches.loading}
            />
          </Flex>
          <Flex justifyCenter>
            {caches.data.docs
              && caches.data.docs.map(item => (
                <Card key={item._id}>
                  <Cache user={auth} item={item} key={item._id} />
                </Card>
              ))}
          </Flex>
        </Fragment>
      )}
      {caches.loading && 'loading...'}
    </Container>
  );
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Caches);
