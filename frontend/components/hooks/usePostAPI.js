import { useState, useCallback } from 'react';
import axios from 'axios';

export default function (url, payload) {
  const [res, setRes] = useState({ data: null, error: null, loading: false });

  const callAPI = useCallback(() => {
    setRes(prevState => ({ ...prevState, loading: true }));
    axios
      .post(url, payload, { withCredentials: true })
      .then((resolve) => {
        setRes({
          data: resolve.data,
          loading: false,
          submitting: false,
        });
      })
      .catch((err) => {
        const errors = err.request.response
          ? JSON.parse(err.request.response)
          : err.message;
        setRes({
          data: null,
          loading: false,
          errors,
        });
      });
  }, [url, payload]);
  return [res, callAPI];
}
