import { combineReducers } from "redux";
import { profile, list } from "store/ducks";

const rootReducer = combineReducers({
  profile,
  list,
});

export default rootReducer;
