import { useState, useCallback } from 'react';
import axios from 'axios';

export default function (url, data) {
  const [res, setRes] = useState({ data: null, error: null, loading: false });

  const callAPI = useCallback(() => {
    setRes(prevState => ({ ...prevState, loading: true }));
    axios
      .post(url, data, { withCredentials: true })
      .then((resolve) => {
        setRes({
          data: resolve.data,
          loading: false,
          submitting: false,
        });
      })
      .catch((err) => {
        setRes({
          data: null,
          loading: false,
          err,
        });
      });
  }, [url, data]);
  return [res, callAPI];
}
