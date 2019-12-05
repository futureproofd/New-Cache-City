export default function (state = null, action) {
  switch (action.type) {
    case 'FETCH_USER':
      return action.payload || false;
    case 'DESTROY_USER':
      return false;
    default:
      return state;
  }
}
