/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

class AuthRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props;

    return (
      <Route
        {...props}
        render={props => (this.state.authenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          ))
        }
      />
    );
  }
}

export default AuthRoute;
