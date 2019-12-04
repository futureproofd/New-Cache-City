/* eslint-disable no-underscore-dangle */
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Cache from './Cache';
import Flex from '../styles/containers/Flex';
import Container from '../styles/containers/Container';
import Card from '../styles/containers/Card';
import useGetCaches from './hooks/useGetCaches';
import PagerImpl from './PagerImpl';

const uri = process.env.DEV_API;

const Caches = ({ auth }) => {
  // API Caches Hook
  const [pageNum, setPage] = useState(1);
  const [caches, getCaches] = useGetCaches(`${uri}caches?page=${pageNum}`);

  const onPageChange = (cursor) => {
    setPage(cursor);
  };

  return (
    <Container tight>
      {caches.data && (
        <Fragment>
          <Flex justifyCenter>
            <PagerImpl
              pagesCount={caches.data ? caches.data.totalPages : 1}
              cursor={caches.data ? caches.data.page : 1}
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
