import { combineReducers } from 'redux';
import authReducer from './authReducer';

// incase of any future reducers
export default combineReducers({
  auth: authReducer,
});
