/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../components/Home';
import Caches from '../components/Caches';
import CacheDetail from '../components/CacheDetail';
import AddCache from '../components/AddCache';
import Map from '../components/Map';
import Register from '../components/Register';
import Account from '../components/Account';
import Login from '../components/Login';

const Routes = (props) => {
  const renderRoutes = () => {
    switch (props.auth) {
      case null:
        return (
          <Fragment>
            <Route path="/" exact render={() => <Home />} />
            <Route path="/map" render={() => <Map />} />
            <Route path="/register" render={() => <Register />} />
            <Route path="/login" render={() => <Login />} />
          </Fragment>
        );
      case false:
        return (
          <Fragment>
            <Route path="/" exact render={() => <Home />} />
            <Route path="/map" render={() => <Map />} />
            <Route path="/register" render={() => <Register />} />
            <Route path="/login" render={() => <Login />} />
          </Fragment>
        );
      default:
        return (
          <Fragment>
            <Route path="/" exact render={() => <Home />} />
            <Route path="/caches" render={() => <Caches />} />
            <Route path="/cache" render={props => <CacheDetail {...props} />} />
            <Route path="/addcache" render={() => <AddCache />} />
            <Route path="/account" render={() => <Account />} />
            <Route path="/map" render={() => <Map />} />
          </Fragment>
        );
    }
  };

  return <Switch>{renderRoutes()}</Switch>;
};

export default Routes;
