import { combineReducers } from 'redux';
import { default as userProfile } from './userProfileReducer'; // eslint-disable-line import/no-named-default

const reducers = combineReducers({
  userProfile,
});

export default reducers;
