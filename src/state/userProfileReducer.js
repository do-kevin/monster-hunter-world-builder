const initialState = {
  first_name: '',
  last_name: '',
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case 'GETPROFILE':
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
