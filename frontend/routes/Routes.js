import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from '../components/Layout';
import Test from '../components/Test';
import Caches from '../components/Caches';
import Map from '../components/Map';
import Register from '../components/Register';
import Account from '../components/Account';
import Login from '../components/Login';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          render={props => (
            <Layout {...props}>
              <Test />
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
        <Route
          path="/account"
          render={props => (
            <Layout {...props}>
              <Account />
            </Layout>
          )}
        />
      </Switch>
    </Router>
  );
}