/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/Theme';

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

export default class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Inner>
          <p>Page defaults here</p>
          {this.props.children}
        </Inner>
      </ThemeProvider>
    );
  }
}
