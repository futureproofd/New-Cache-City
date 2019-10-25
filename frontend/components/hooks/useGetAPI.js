import { useState, useCallback } from 'react';
import axios from 'axios';

export default function (url) {
  const [res, setRes] = useState({ data: null, error: null, loading: false });

  const callAPI = useCallback(() => {
    setRes(prevState => ({ ...prevState, loading: true }));

    async function fetchData() {
      try {
        const result = await axios.get(url, { withCredentials: true });
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
  }, [url]);
  return [res, callAPI];
}
