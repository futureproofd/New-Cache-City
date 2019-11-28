/* eslint-disable no-useless-escape */
export function validateRegistration(values) {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email Address required!';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email Address is invalid!';
  }
  if (!values.name) {
    errors.name = 'Name required';
  } else if (
    /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\<|\,|\.|\>|\?|\/|\""|\;|\:/.test(
      values.name,
    )
  ) {
    errors.name = 'No special characters allowed.';
  } else if (values.name.length < 3) {
    errors.name = 'Name must be at least 3 characters.';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be 8 or more characters';
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/.test(
      values.password,
    )
  ) {
    errors.password =      'Password must be at least 8 characters, contain an Uppercase, Lowercase, Number, and Special Character (#$^+=!*()@%&).';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'You must confirm your password!';
  } else if (values.password !== values.confirmPassword) {
    errors.passowrd = 'Passwords do not match!';
    errors.confirmPassword = 'Passwords do not match!';
  }
  return errors;
}

export function validateNewCache(values) {
  const errors = {};
  if (!values.name) {
    errors.name = 'Name required.';
  } else if (
    /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\<|\,|\.|\>|\?|\/|\""|\;|\:/.test(
      values.name,
    )
  ) {
    errors.name = 'No special characters allowed.';
  } else if (values.name.length < 3) {
    errors.name = 'Name must be at least 3 characters.';
  }

  if (!values.description) {
    errors.description = 'Description required.';
  } else if (
    /\`|\~|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\<|\>|\/|\""|\;/.test(
      values.description,
    )
  ) {
    errors.description = 'No special characters allowed.';
  } else if (values.description.length < 20) {
    errors.description = 'description must be at least 20 characters.';
  }

  if (!values.location) {
    errors.location = 'Provide a location!';
  }

  if (!values.coordinates) {
    errors.coordinates = 'Please provide refined coordinates.';
  }
  return errors;
}

export function validateQuery(values) {
  const errors = {};
  if (!values.search) {
    errors.search = 'Provide a Cache Name!';
  } else if (
    /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\<|\,|\.|\>|\?|\/|\""|\;|\:/.test(
      values.search,
    )
  ) {
    errors.search = 'No special characters allowed';
  }
}
