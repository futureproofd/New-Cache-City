/* eslint-disable no-undef */
import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  // limit running of effect to when submitted
  const [isSubmitting, setIsSubmitting] = useState(false);

  // run effect whenever errors change (call callback function i.e. form submit, if no errors)
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  // handle synthetic/non-synthetic variety of field event handlers
  const handleChange = (event) => {
    let data;
    if (event.target) {
      event.persist();
      data = { [event.target.name]: event.target.value };
    } else {
      data = { [Object.keys(event)[0]]: Object.values(event)[0] };
    }
    setValues(state => ({
      ...state,
      ...data,
    }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};

export default useForm;
