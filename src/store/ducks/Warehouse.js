import { requestAllArmors, requestAllWeapons } from "services/MonsterHunterWorldApi";
import _ from "lodash";

// ==== Types ==== //
const RETRIEVE_ALL_ARMORS = "RETRIEVE_ALL_ARMORS";
const RETRIEVE_ALL_WEAPONS = "RETRIEVE_ALL_WEAPONS";
const CLEAR_WAREHOUSE = "CLEAR_WAREHOUSE";
const SET_LOCAL_ARMORS = "SET_LOCAL_ARMORS";
const SET_LOCAL_WEAPONS = "SET_LOCAL_WEAPONS";

// ==== Actions ==== //
export const retrieveAllArmors = () => async (dispatch) => {
  const response = await requestAllArmors();
  const { data } = response;

  dispatch({
    type: RETRIEVE_ALL_ARMORS,
    payload: _.keyBy(data, "id"),
  });
};

export const retrieveAllWeapons = () => async (dispatch) => {
  const response = await requestAllWeapons();
  const { data } = response;

  dispatch({
    type: RETRIEVE_ALL_WEAPONS,
    payload: _.keyBy(data, "id"),
  });
};

export const setLocalArmors = () => (dispatch) => {
  const localArmors = JSON.parse(localStorage.getItem("armors"));

  if (localArmors) {
    dispatch({
      type: SET_LOCAL_ARMORS,
      payload: localArmors,
    });
    return true;
  }
  return false;
};

export const setLocalWeapons = () => (dispatch) => {
  const localWeapons = JSON.parse(localStorage.getItem("weapons"));
  if (localWeapons) {
    dispatch({
      type: SET_LOCAL_WEAPONS,
      payload: localWeapons,
    });
    return true;
  }
  return false;
};

export const clearWarehouse = () => dispatch => dispatch({ type: CLEAR_WAREHOUSE });

// ======================= Reducers ======================= //
const smithy = {
  armors: {},
  weapons: {},
};

function warehouse(state = smithy, action) {
  switch (action.type) {
    case RETRIEVE_ALL_ARMORS: {
      const manifest = {
        armors: action.payload,
      };

      const stringifiedManifest = JSON.stringify(manifest);
      localStorage.setItem("armors", stringifiedManifest);
      return Object.assign({}, state, manifest);
    }
    case SET_LOCAL_ARMORS: {
      if (action.payload) {
        return Object.assign({}, state, action.payload);
      }
      return state;
    }
    case RETRIEVE_ALL_WEAPONS: {
      const manifest = {
        weapons: action.payload,
      };

      const stringifiedManifest = JSON.stringify(manifest);
      localStorage.setItem("weapons", stringifiedManifest);
      return Object.assign({}, state, manifest);
    }
    case SET_LOCAL_WEAPONS: {
      if (action.payload) {
        return Object.assign({}, state, action.payload);
      }
      return state;
    }
    case CLEAR_WAREHOUSE:
      return smithy;
    default:
      return state;
  }
}

export default warehouse;
