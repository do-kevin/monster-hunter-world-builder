import { combineReducers } from "redux";
import profile from "redux/state/profile/Reducers";
import userList from "redux/state/list/Reducers";

const rootReducer = combineReducers({
  profile,
  userList,
});

export default rootReducer;
