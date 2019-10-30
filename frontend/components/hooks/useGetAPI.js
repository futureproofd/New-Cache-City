import { useState, useCallback } from 'react';
import axios from 'axios';

export default function (url) {
  const [res, setRes] = useState({ data: null, error: null, loading: false });

  /**
   * takes optional param for custom query string
   */
  const callAPI = useCallback(
    (param) => {
      setRes(prevState => ({ ...prevState, loading: true }));

      async function fetchData() {
        try {
          let result;
          if (param) {
            result = await axios.get(url + param, { withCredentials: true });
          } else {
            result = await axios.get(url, { withCredentials: true });
          }

          setRes({
            data: result.data,
            loading: false,
            submitting: false,
          });
        } catch (err) {
          const errors = err.request.response
            ? JSON.parse(err.request.response)
            : err.message;
          setRes({
            data: null,
            loading: false,
            errors,
          });
        }
      }
      // invoke async function for result
      fetchData();
    },
    [url],
  );
  return [res, callAPI];
}
