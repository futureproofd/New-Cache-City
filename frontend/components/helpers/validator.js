export default function validate(values) {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email Address required!';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email Address is invalid!';
  }
  if (!values.name) {
    errors.name = 'Name required (Alphanumeric)';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be 8 or more characters';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'You must confirm your password!';
  } else if (values.password !== values.confirmPassword) {
    errors.passowrd = 'Passwords do not match!';
    errors.confirmPassword = 'Passwords do not match!';
  }
  return errors;
}
