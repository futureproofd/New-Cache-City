/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import Home from '../components/Home';
import Caches from '../components/Caches';
import Map from '../components/Map';
import Register from '../components/Register';
import Account from '../components/Account';
import Login from '../components/Login';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={props => (
              <Layout {...props}>
                <Home />
              </Layout>
            )}
          />
          <Route
            path="/caches"
            render={props => (
              <Layout {...props}>
                <Caches />
              </Layout>
            )}
          />
          <Route
            path="/map"
            render={props => (
              <Layout {...props}>
                <Map />
              </Layout>
            )}
          />
          <Route
            path="/register"
            render={props => (
              <Layout {...props}>
                <Register />
              </Layout>
            )}
          />
          <Route
            path="/login"
            render={props => (
              <Layout {...props}>
                <Login />
              </Layout>
            )}
          />
          {this.props.auth && (
            <Route
              path="/account"
              render={props => (
                <Layout {...props}>
                  <Account />
                </Layout>
              )}
            />
          )}
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Routes);
