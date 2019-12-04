export default (state, action) => {
  switch (action.type) {
    case 'changeSettings':
      return {
        ...state,
        settings: action.newSettings,
      };
    default:
      return state;
  }
};
