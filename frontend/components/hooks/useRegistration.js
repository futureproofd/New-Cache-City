import { useEffect, useRef } from 'react';
import axios from 'axios';

export default function (loading, data) {
  // stop effect from automatically triggering on first mount
  const firstMount = useRef(true);

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
      return;
    }

    axios
      .post('http://localhost:7888/api/register', {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      })
      .then((res) => {
        const user = res.data;
        if (!user) {
          alert('no user found');
        }
      });
  }, [loading]);
}
