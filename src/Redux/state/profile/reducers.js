import { combineReducers } from 'redux';
import { UPDATE_PROFILE, USER_LOGOUT } from './constants';

const profileState = {
  user: null,
};

function profile(state = profileState, action) {
  switch (action.type) {
    case UPDATE_PROFILE:
      return Object.assign({}, state, action.payload);
    case USER_LOGOUT:
      return profileState;
    default:
      return state;
  }
}

const profileReducer = combineReducers({
  profile,
});

export default profileReducer;