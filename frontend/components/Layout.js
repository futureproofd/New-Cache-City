/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Page from './Page';
import Header from './Header';
import Footer from './Footer';

class Layout extends Component {
  render() {
    return (
      <div>
        <Header />
        <Page>{this.props.children}</Page>
        <Footer />
      </div>
    );
  }
}

export default Layout;
