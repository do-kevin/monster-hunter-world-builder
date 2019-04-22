import { combineReducers } from 'redux';
import { UPDATE_PROFILE } from './constants';

const profileState = {
  user: null,
};

function profile(state = profileState, action) {
  switch (action.type) {
    case UPDATE_PROFILE:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}

const profileReducer = combineReducers({
  profile,
});

export default profileReducer;
