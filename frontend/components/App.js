/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { fetchUser } from '../actions';

// route is the child route clicked inside of App
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return <div>{renderRoutes(this.props.route.routes)}</div>;
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}

// app always dispatches for an authed user
export default {
  component: connect(mapStateToProps, { fetchUser })(App),
  loadData: ({ dispatch }) => dispatch(fetchUser()),
};
