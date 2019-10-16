/* eslint-disable react/destructuring-assignment */
/* eslint-disable consistent-return */
/* eslint-disable react/prefer-stateless-function */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NavStyle from '../styles/NavStyle';

class Nav extends Component {
  renderMenu() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <Fragment>
            <Link to="/map">Map</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </Fragment>
        );
      default:
        return (
          <Fragment>
            <Link to="/caches">Caches</Link>
            <Link to="/addcache">Create</Link>
            <Link to="/map">Map</Link>
            <Link to="/account">Account</Link>
          </Fragment>
        );
    }
  }

  render() {
    return <NavStyle>{this.renderMenu()}</NavStyle>;
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Nav);
