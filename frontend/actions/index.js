/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('http://localhost:7888/api/current_user', {
    withCredentials: true,
  });
  dispatch({ type: 'FETCH_USER', payload: res.data });
};
