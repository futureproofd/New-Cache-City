import React from 'react';
import { Link } from 'react-router-dom';
import NavStyle from '../styles/NavStyle';

const Nav = () => (
  <NavStyle>
    <Link to="/caches">Caches</Link>
    <Link to="/map">Map</Link>
  </NavStyle>
);

export default Nav;
