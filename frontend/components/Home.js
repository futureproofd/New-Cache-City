/* eslint-disable react/destructuring-assignment */
/* eslint-disable consistent-return */
/* eslint-disable react/prefer-stateless-function */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return (
          <Fragment>
            <div>Default homepage</div>
          </Fragment>
        );
      case false:
        return (
          <Fragment>
            <div>Unauthenticated stuff goes here</div>
          </Fragment>
        );
      default:
        return (
          <Fragment>
            <div>Authenticated User stuff goes here</div>
          </Fragment>
        );
    }
  }

  render() {
    return this.renderContent();
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Home);
