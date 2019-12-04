/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Container from '../styles/containers/Container';
import Header from './Header';
import Footer from './Footer';

const Layout = props => (
  <div>
    <Header {...props} />
    <Container full>{props.children}</Container>
    <Footer />
  </div>
);

export default Layout;
