/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
import { useState, useCallback } from 'react';
import axios from 'axios';

export default function (url, payload) {
  const [res, setRes] = useState({ data: null, error: null, loading: false });

  const callAPI = useCallback(
    (event) => {
      setRes(prevState => ({ ...prevState, loading: true }));
      // If event is a file/upload, set as formData to process via multer
      let multiPartData;
      let finalPayload;
      if (event) {
        multiPartData = event.target.files[0];
      }

      if (multiPartData) {
        const formData = new FormData();
        formData.append('photo', multiPartData);
        finalPayload = formData;
      } else {
        finalPayload = payload;
      }

      axios
        .post(url, finalPayload, { withCredentials: true })
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
    },
    [url, payload],
  );
  return [res, callAPI];
}
