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

export const armorToLoadout = (loadoutName, armorData, type) => async (dispatch, getState) => {
  const { loadouts, warehouse } = getState();
  const { armors } = warehouse;
  const {
    head, chest, waist, legs, gloves,
  } = loadouts.builds[loadoutName].armor_set;
  const armorMeta = loadouts.builds[loadoutName].armor_meta;
  const newArmorMeta = Object.assign({}, armorMeta);
  console.log(newArmorMeta);
  const previousArmors = {
    head,
    chest,
    waist,
    legs,
    gloves,
  };

  const selectedArmorId = armorData.id;

  console.log(armorData);
  const currentArmorId = loadouts.builds[loadoutName].armor_set[type];

  if (currentArmorId === null) {
    _.set(newArmorMeta, `defense.base`, newArmorMeta.defense.base + armorData.defense.base);
    _.set(newArmorMeta, `defense.max`, newArmorMeta.defense.max + armorData.defense.max);
    _.set(newArmorMeta, `defense.augmented`, newArmorMeta.defense.augmented + armorData.defense.augmented);
  } else if (currentArmorId !== selectedArmorId) {
    console.log("2nd check:", currentArmorId !== selectedArmorId);
    _.set(newArmorMeta, `defense.base`, armorMeta.defense.base - armors[previousArmors[type]].defense.base);
    _.set(newArmorMeta, `defense.max`, armorMeta.defense.max - armors[previousArmors[type]].defense.max);
    _.set(newArmorMeta, `defense.augmented`, armorMeta.defense.augmented - armors[previousArmors[type]].defense.augmented);

    _.set(newArmorMeta, `defense.base`, newArmorMeta.defense.base + armorData.defense.base);
    _.set(newArmorMeta, `defense.max`, newArmorMeta.defense.max + armorData.defense.max);
    _.set(newArmorMeta, `defense.augmented`, newArmorMeta.defense.augmented + armorData.defense.augmented);
  }

  _.set(previousArmors, type, selectedArmorId);

  const action = {
    key: loadoutName,
    armor: armorData,
    previousArmors,
    newArmorMeta,
  };

  console.log("action", action);

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
        armor_meta: {
          defense: {
            base: 0,
            max: 0,
            augmented: 0,
          },
          previousArmors: {
            head: null,
            chest: null,
            waist: null,
            legs: null,
            gloves: null,
          },
        },
      }; 
      toast.success("Loadout created.");
      return newState;
    }
    case ARMOR_TO_LOADOUT: {
      const newState = Object.assign({}, state);
      const {
        key: loadoutName, armor, previousArmors, newArmorMeta,
      } = action.payload;
      _.set(newState, `builds.${loadoutName}.armor_set.${armor.type}`, armor.id);
      _.set(newState, `builds.${loadoutName}.armor_meta.previousArmors`, previousArmors);
      _.set(newState, `builds.${loadoutName}.armor_meta.defense`, newArmorMeta.defense);
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
