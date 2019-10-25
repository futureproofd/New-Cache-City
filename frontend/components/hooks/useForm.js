import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  // limit running of effect to when submitted
  const [isSubmitting, setIsSubmitting] = useState(false);

  // run effect whenever errors change (call callback function if no errors)
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

  // autocomplete popup handler
  const handleAddressChange = (field) => {
    setValues(state => ({
      ...state,
      [field.name]: [field.value],
    }));
  };

  const handleChange = (event) => {
    if (event.target) {
      event.persist();
    } else {
      handleAddressChange(event);
      return;
    }
    setValues(state => ({
      ...state,
      [event.target.name]: event.target.value,
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
