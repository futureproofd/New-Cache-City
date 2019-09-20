/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-no-undef */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './Layout';
import Test from './Test';
import Caches from './Caches';
import Map from './Map';

class App extends Component {
  render() {
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
        </Switch>
      </Router>
    );
  }
}

export default App;
