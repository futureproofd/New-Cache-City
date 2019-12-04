/* eslint-disable react/destructuring-assignment */
/* eslint-disable consistent-return */
/* eslint-disable react/prefer-stateless-function */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FooterStyle from '../styles/FooterStyle';
import Container from '../styles/containers/Container';
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
    return (
      <Container full tight>
        <FooterStyle>{this.renderMenu()}</FooterStyle>
      </Container>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Footer);
