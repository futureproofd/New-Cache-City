/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';
import Routes from '../routes/Routes';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return <Routes />;
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  { fetchUser },
)(App);
