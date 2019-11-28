import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import HeaderStyle from '../styles/HeaderStyle';
import LogoStyle from '../styles/LogoStyle';
import Search from './Search';

const Header = auth => (
  <HeaderStyle>
    <div className="bar">
      <LogoStyle>
        <Link to="/">New Cache City</Link>
      </LogoStyle>
      <Nav {...auth} />
    </div>
    <div className="sub-bar">
      <Search />
    </div>
  </HeaderStyle>
);

export default Header;
