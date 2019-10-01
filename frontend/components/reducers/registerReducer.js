export default function (state, action) {
  if (action.type === 'login') {
    return {
      ...state,
      loading: true,
      error: '',
    };
  }
  if (action.type === 'success') {
    return {
      ...state,
      loading: false,
      error: '',
      registered: true,
    };
  }
  if (action.type === 'error') {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }
  if (action.type === 'input') {
    return {
      ...state,
      [action.name]: action.value,
    };
  }
  throw new Error('action type not supported');
}
