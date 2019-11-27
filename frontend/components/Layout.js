/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Page from './Page';
import Header from './Header';
import Footer from './Footer';

const Layout = props => (
  <div>
    <Header {...props} />
    <Page>{props.children}</Page>
    <Footer />
  </div>
);

export default Layout;
