import { combineReducers } from "redux";
import {
  profile, list, loadouts, warehouse,
} from "store/ducks";

const rootReducer = combineReducers({
  profile,
  list,
  loadouts,
  warehouse,
});

export default rootReducer;
