import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import HeaderStyle from '../styles/HeaderStyle';
import LogoStyle from '../styles/LogoStyle';

const Header = () => (
  <HeaderStyle>
    <div className="bar">
      <LogoStyle>
        <Link to="/">New Cache City</Link>
      </LogoStyle>
      <Nav />
    </div>
    <div className="sub-bar">search here</div>
  </HeaderStyle>
);

export default Header;
