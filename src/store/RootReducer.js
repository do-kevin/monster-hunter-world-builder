import { combineReducers } from "redux";
import { profile, list, armors } from "store/ducks";

const rootReducer = combineReducers({
  profile,
  list,
  armors,
});

export default rootReducer;
