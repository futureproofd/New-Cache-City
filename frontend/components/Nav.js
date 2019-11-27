/* eslint-disable react/destructuring-assignment */
/* eslint-disable consistent-return */
/* eslint-disable react/prefer-stateless-function */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import NavStyle from '../styles/NavStyle';

const Nav = (props) => {
  const renderMenu = () => {
    switch (props.auth) {
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
  };

  return <NavStyle>{renderMenu()}</NavStyle>;
};

export default Nav;
