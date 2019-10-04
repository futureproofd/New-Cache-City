import React from 'react';
import { Link } from 'react-router-dom';
import NavStyle from '../styles/NavStyle';

const Nav = () => (
  <NavStyle>
    <Link to="/caches">Caches</Link>
    <Link to="/map">Map</Link>
    <Link to="/register">Register</Link>
    <Link to="/login">Login</Link>
    <Link to="/account">Account</Link>
  </NavStyle>
);

export default Nav;
