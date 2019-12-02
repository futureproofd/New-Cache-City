/* eslint-disable no-underscore-dangle */
import React from 'react';
import { connect } from 'react-redux';
import Cache from './Cache';
import Flex from '../styles/containers/Flex';
import Container from '../styles/containers/Container';
import Card from '../styles/containers/Card';
import useGetCaches from './hooks/useGetCaches';

const uri = process.env.DEV_API;

const Caches = ({ auth }) => {
  // API Caches Hook
  const [caches, getCaches] = useGetCaches(`${uri}caches`);

  return (
    <Container>
      <Flex justifyCenter>
        {caches.data
          && caches.data.map((item, i) => (
            <Card>
              <Cache user={auth} item={item} key={item._id} />
            </Card>
          ))}
      </Flex>
    </Container>
  );
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Caches);
