/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const uri = process.env.DEV_API;

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get(`${uri}current_user`, {
    withCredentials: true,
  });
  dispatch({ type: 'FETCH_USER', payload: res.data });
};
