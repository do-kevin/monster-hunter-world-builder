import { requestAllArmors } from "services/MonsterHunterWorldApi";
// import { normalize, schema } from "normalizr";
import _ from "lodash";
import { toast } from "react-toastify";

// ==== Types ==== //
const RETRIEVE_ALL_ARMORS = "RETRIEVE_ALL_ARMORS";
const CREATE_LOADOUT = "CREATE_LOADOUT";
const CLEAR_LOADOUTS = "CLEAR_LOADOUTS";
const ARMOR_TO_LOADOUT = "ARMOR_TO_LOADOUT";
const CLEAR_ARMORS = "CLEAR_ARMORS";

// ==== Actions ==== //
export const retrieveAllArmors = () => async (dispatch) => {
  console.log("retrieveAllArmors called");
  const response = await requestAllArmors();
  const { data } = response;

  dispatch({
    type: RETRIEVE_ALL_ARMORS,
    payload: _.keyBy(data, "id"),
  });
};

export const createLoadout = loadoutName => (dispatch, getState) => {
  const { loadouts } = getState();
  const { builds } = loadouts;

  if (builds[loadoutName] !== undefined) {
    return toast.error("There is already a loadout with this name.");
  }

  return dispatch({
    type: CREATE_LOADOUT,
    payload: loadoutName,
  });
};

export const armorToLoadout = (loadoutName, armorPiece) => async (dispatch) => {
  const action = {
    key: loadoutName,
    armor: armorPiece,
  };

  dispatch({
    type: ARMOR_TO_LOADOUT,
    payload: action,
  });
};

export const clearArmors = () => dispatch => dispatch({ type: CLEAR_ARMORS });

export const clearLoadouts = () => dispatch => dispatch({ type: CLEAR_LOADOUTS });

// ======================= Reducers ======================= //
const armory = {};

export function armors(state = armory, action) {
  switch (action.type) {
    case RETRIEVE_ALL_ARMORS:
      return Object.assign({}, state, action.payload);
    case CLEAR_ARMORS:
      return armory;
    default:
      return state;
  }
}

const initialState = {
  builds: {},
};

const initialStateForArmor = {
  head: null,
  chest: null,
  waist: null,
  legs: null,
  gloves: null,
};

export function loadouts(state = initialState, action) {
  switch (action.type) {
    case CREATE_LOADOUT: {
      const newState = Object.assign({}, state);
      newState.builds[action.payload] = {
        armor_set: { ...initialStateForArmor },
        weapon: null,
      };
      return newState;
    }
    case ARMOR_TO_LOADOUT: {
      const newState = Object.assign({}, state);
      const { key: loadoutName, armor } = action.payload;
      console.log(loadoutName, armor);
      _.set(newState, `builds.${loadoutName}.armor_set.${armor.type}`, armor.id);
      return newState;
    }
    case CLEAR_LOADOUTS:
      return initialState;
    default:
      return state;
  }
}
