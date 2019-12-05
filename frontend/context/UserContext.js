import React, { createContext, useContext, useReducer } from 'react';

export const UserContext = createContext();

/**
 *
 * @param {reducer} reducer including action types to dispatch
 * @param {Component} children the render props / or App this context Provider wraps
 * @param {object} initialState defines an initial state object including default, user values
 */
export const UserProvider = ({ reducer, initialState, children }) => (
  <UserContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </UserContext.Provider>
);

export const useUserValue = () => useContext(UserContext);
