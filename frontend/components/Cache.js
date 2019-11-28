/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import CacheStyle from '../styles/CacheStyle';

const Cache = ({ item, user }) => {
  const renderCaches = () => {
    const owner = user._id === item.author;

    switch (owner) {
      case false:
        return (
          <Fragment>
            <Link to={{ pathname: '/cache', state: { item } }}>
              <h1>{item.name}</h1>
            </Link>
            <p>{item.description}</p>
            <img src={item.photo} alt={item.name} />
          </Fragment>
        );
      default:
        if (user._id === item.author) {
          return (
            <Fragment>
              <Link to={{ pathname: '/cache', state: { item } }}>
                <h1>{item.name}</h1>
              </Link>
              <p>{item.description}</p>
              <img src={item.photo} alt={item.name} />
              <Link to={{ pathname: '/cache', state: { item, user } }}>
                <div className="buttonList">
                  <button type="button">Edit</button>
                  <button type="button">Star</button>
                  <button type="button">Delete</button>
                </div>
              </Link>
            </Fragment>
          );
        }
    }
  };

  return <CacheStyle key={item.id}>{renderCaches()}</CacheStyle>;
};

export default Cache;
