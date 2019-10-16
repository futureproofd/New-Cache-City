import { useState, useEffect } from 'react';
import axios from 'axios';

export default function (url) {
  const [res, setRes] = useState({ data: null, error: null, loading: false });

  const callAPI = useEffect(() => {
    setRes(prevState => ({ ...prevState, loading: true }));
    axios
      .get(url, { withCredentials: true })
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
  }, []);
  return [res, callAPI];
}
