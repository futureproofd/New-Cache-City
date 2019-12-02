/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-no-undef */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { fetchUser } from '../actions';
import Routes from '../routes/Routes';
import Layout from './Layout';
import theme from '../styles/Theme';
import GlobalStyle from '../styles/GlobalStyle';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Fragment>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Layout auth={this.props.auth}>
              <Routes auth={this.props.auth} />
            </Layout>
          </BrowserRouter>
        </ThemeProvider>
      </Fragment>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { fetchUser })(App);
