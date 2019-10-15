/* eslint-disable react/destructuring-assignment */
/* eslint-disable consistent-return */
/* eslint-disable react/prefer-stateless-function */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FooterStyle from '../styles/FooterStyle';
import Logout from './Logout';

class Footer extends Component {
  renderMenu() {
    switch (this.props.auth) {
      case null:
        return (
          <Fragment>
            <Link to="/login">Login</Link>
          </Fragment>
        );
      case false:
        return (
          <Fragment>
            <Link to="/login">Login</Link>
          </Fragment>
        );
      default:
        return (
          <Fragment>
            <Logout />
          </Fragment>
        );
    }
  }

  render() {
    return <FooterStyle>{this.renderMenu()}</FooterStyle>;
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Footer);
