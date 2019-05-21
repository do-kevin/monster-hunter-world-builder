import _ from "lodash";
import { toast } from "react-toastify";
import uuidv4 from "uuid/v4";

// ==== Types ==== //
const CREATE_LOADOUT = "CREATE_LOADOUT";
const CLEAR_LOADOUTS = "CLEAR_LOADOUTS";
const ARMOR_TO_LOADOUT = "ARMOR_TO_LOADOUT";
const WEAPON_TO_LOADOUT = "WEAPON_TO_LOADOUT";

// ==== Actions ==== //
export const createLoadout = loadoutName => (dispatch, getState) => {
  const { loadouts } = getState();
  const { builds } = loadouts;
  const name = loadoutName.trim();

  if (name === "") {
    return toast.error("Loadout's name cannot be just whitespaces.");
  }

  if (builds[name] !== undefined) {
    return toast.error("There is already a loadout with this name.");
  }

  return dispatch({
    type: CREATE_LOADOUT,
    payload: loadoutName,
  });
};

export const armorToLoadout = (loadoutName, armorData) => async (dispatch) => {
  const action = {
    key: loadoutName,
    armor: armorData,
  };

  dispatch({
    type: ARMOR_TO_LOADOUT,
    payload: action,
  });
};

export const weaponToLoadout = (loadoutName, weaponData) => async (dispatch) => {
  const action = {
    key: loadoutName,
    weapon: weaponData,
  };

  dispatch({
    type: WEAPON_TO_LOADOUT,
    payload: action,
  });
};

export const clearLoadouts = () => dispatch => dispatch({ type: CLEAR_LOADOUTS });

// ======================= Reducers ======================= //
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

function loadouts(state = initialState, action) {
  switch (action.type) {
    case CREATE_LOADOUT: {
      const newState = Object.assign({}, state);
      newState.builds[action.payload] = {
        armor_set: { ...initialStateForArmor },
        weapon: null,
        id: uuidv4(),
      };
      toast.success("Loadout created.");
      return newState;
    }
    case ARMOR_TO_LOADOUT: {
      const newState = Object.assign({}, state);
      const { key: loadoutName, armor } = action.payload;
      _.set(newState, `builds.${loadoutName}.armor_set.${armor.type}`, armor.id);
      toast.success(`Saved to ${loadoutName}`);
      return newState;
    }
    case WEAPON_TO_LOADOUT: {
      const newState = Object.assign({}, state);
      const { key: loadoutName, weapon } = action.payload;
      _.set(newState, `builds.${loadoutName}.weapon_set.primary`, weapon.id);
      toast.success(`Saved to ${loadoutName}`);
      return newState;
    }
    case CLEAR_LOADOUTS:
      return initialState;
    default:
      return state;
  }
}

export default loadouts;
