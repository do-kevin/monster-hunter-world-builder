import { requestAllArmors, requestAllWeapons } from "services/MonsterHunterWorldApi";
import _ from "lodash";

// ==== Types ==== //
const RETRIEVE_ALL_ARMORS = "RETRIEVE_ALL_ARMORS";
const RETRIEVE_ALL_WEAPONS = "RETRIEVE_ALL_WEAPONS";
const CLEAR_WAREHOUSE = "CLEAR_WAREHOUSE";

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
      return Object.assign({}, state, manifest);
    }
    case RETRIEVE_ALL_WEAPONS: {
      return Object.assign({}, state, { weapons: action.payload });
    }
    case CLEAR_WAREHOUSE:
      return smithy;
    default:
      return state;
  }
}

export default warehouse;
