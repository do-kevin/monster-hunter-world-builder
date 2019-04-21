import { GET_PROFILE, FETCH_PROFILE } from 'Redux/actions/types';

const initialState = {
  user: null,
  first_name: '',
  last_name: '',
  birth_date: '',
  phone_number: '',
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return Object.assign({}, state, action.payload);
    case FETCH_PROFILE:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
}
