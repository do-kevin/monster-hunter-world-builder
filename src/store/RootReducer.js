import { combineReducers } from "redux";
import {
  profile, list, armors, loadouts,
} from "store/ducks";

const rootReducer = combineReducers({
  profile,
  list,
  armors,
  loadouts,
});

export default rootReducer;
