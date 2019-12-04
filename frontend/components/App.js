/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-no-undef */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { UserProvider } from '../context/UserContext';
import userReducer from '../context/reducers/UserReducer';
import { fetchUser } from '../actions';
import Routes from '../routes/Routes';
import Layout from './Layout';
import theme from '../styles/Theme';
import GlobalStyle from '../styles/GlobalStyle';

const initialState = { settings: { page: 1 } };

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Fragment>
        <UserProvider initialState={initialState} reducer={userReducer}>
          <GlobalStyle />
          <ThemeProvider theme={theme}>
            <Router>
              <Layout auth={this.props.auth}>
                <Routes auth={this.props.auth} />
              </Layout>
            </Router>
          </ThemeProvider>
        </UserProvider>
      </Fragment>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { fetchUser })(App);
