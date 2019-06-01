import _ from "lodash";
import { toast } from "react-toastify";
import uuidv4 from "uuid/v4";
import { getMyLoadouts } from "services/MonsterHunterWorldApi";

// ==== Types ==== //
const CREATE_LOADOUT = "CREATE_LOADOUT";
const CLEAR_LOADOUTS = "CLEAR_LOADOUTS";
const ARMOR_TO_LOADOUT = "ARMOR_TO_LOADOUT";
const WEAPON_TO_LOADOUT = "WEAPON_TO_LOADOUT";
const RETRIEVE_MY_LOADOUTS = "RETRIEVE_MY_LOADOUTS";

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
  const previousArmors = {
    head,
    chest,
    waist,
    legs,
    gloves,
  };

  const prevArmorByType = previousArmors[type];
  const selectedArmorId = armorData.id;
  const currentArmorId = loadouts.builds[loadoutName].armor_set[type];

  function addDefRatings() {
    _.set(newArmorMeta, `defense.base`, newArmorMeta.defense.base + armorData.defense.base);
    _.set(newArmorMeta, `defense.max`, newArmorMeta.defense.max + armorData.defense.max);
    _.set(newArmorMeta, `defense.augmented`, newArmorMeta.defense.augmented + armorData.defense.augmented);
  }

  function addResistances() {
    _.set(newArmorMeta, `resistances.fire`, newArmorMeta.resistances.fire + armorData.resistances.fire);
    _.set(newArmorMeta, `resistances.water`, newArmorMeta.resistances.water + armorData.resistances.water);
    _.set(newArmorMeta, `resistances.dragon`, newArmorMeta.resistances.dragon + armorData.resistances.dragon);
    _.set(newArmorMeta, `resistances.thunder`, newArmorMeta.resistances.thunder + armorData.resistances.thunder);
    _.set(newArmorMeta, `resistances.ice`, newArmorMeta.resistances.ice + armorData.resistances.ice);
  }

  function updateDefRatings() {
    _.set(newArmorMeta, `defense.base`, armorMeta.defense.base - armors[prevArmorByType].defense.base);
    _.set(newArmorMeta, `defense.max`, armorMeta.defense.max - armors[prevArmorByType].defense.max);
    _.set(newArmorMeta, `defense.augmented`, armorMeta.defense.augmented - armors[prevArmorByType].defense.augmented);

    addDefRatings();
  }

  function updateResistances() {
    _.set(newArmorMeta, `resistances.fire`, armorMeta.resistances.fire - armors[prevArmorByType].resistances.fire);
    _.set(newArmorMeta, `resistances.water`, armorMeta.resistances.water - armors[prevArmorByType].resistances.water);
    _.set(newArmorMeta, `resistances.dragon`, armorMeta.resistances.dragon - armors[prevArmorByType].resistances.dragon);
    _.set(newArmorMeta, `resistances.thunder`, armorMeta.resistances.thunder - armors[prevArmorByType].resistances.thunder);
    _.set(newArmorMeta, `resistances.ice`, armorMeta.resistances.ice - armors[prevArmorByType].resistances.ice);

    addResistances();
  }

  if (currentArmorId === null) {
    addDefRatings();
    addResistances();
  } else if ((currentArmorId !== selectedArmorId) && prevArmorByType) {
    updateDefRatings();
    updateResistances();
  }

  _.set(previousArmors, type, selectedArmorId);

  const action = {
    key: loadoutName,
    armor: armorData,
    previousArmors,
    newArmorMeta,
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

export const retrieveMyLoadouts = () => async (dispatch) => {
  const myLoadoutsFromDb = await getMyLoadouts();
  dispatch({
    type: RETRIEVE_MY_LOADOUTS,
    payload: myLoadoutsFromDb,
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
        weapon_set: {
          primary: null,
        },
        id: uuidv4(),
        armor_meta: {
          defense: {
            base: 0,
            max: 0,
            augmented: 0,
          },
          resistances: {
            fire: 0,
            water: 0,
            ice: 0,
            thunder: 0,
            dragon: 0,
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
    case RETRIEVE_MY_LOADOUTS: {
      const newState = Object.assign({}, state);
      const { builds } = action.payload.data;
      Object.keys(builds).map((loadoutNames) => {
        newState.builds[loadoutNames] = builds[loadoutNames];
      });
      return newState;
    }
    case CLEAR_LOADOUTS:
      return {
        builds: {},
      };
    default:
      return state;
  }
}

export default loadouts;
