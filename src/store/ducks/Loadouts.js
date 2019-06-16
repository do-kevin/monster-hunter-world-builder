import _ from "lodash";
import { toast } from "react-toastify";
import { getMyLoadouts, getAllLoadouts } from "services/MonsterHunterWorldApi";

// ==== Types ==== //
const CREATE_LOADOUT = "CREATE_LOADOUT";
const CLEAR_LOADOUTS = "CLEAR_LOADOUTS";
const ARMOR_TO_LOADOUT = "ARMOR_TO_LOADOUT";
const WEAPON_TO_LOADOUT = "WEAPON_TO_LOADOUT";
const RETRIEVE_MY_LOADOUTS = "RETRIEVE_MY_LOADOUTS";
const RETRIEVE_DB_LOADOUTS = "RETRIEVE_DB_LOADOUTS";
const REMOVE_LOADOUT = "REMOVE_LOADOUT";

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

export const removeLoadout = loadoutName => (dispatch, getState) => {
  console.log(loadoutName);
  const { builds } = getState().loadouts;
  const loadouts = Object.assign({}, builds);

  delete loadouts[loadoutName];

  console.log(loadouts);

  return dispatch({
    type: REMOVE_LOADOUT,
    payload: loadouts,
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

const defaultLoadoutArmorMeta = (data = {}) => {
  _.set(data, "armor_meta", {
    defense: {
      base: 0,
      max: 0,
      augmented: 0,
    },
    resistances: {
      fire: 0,
      water: 0,
      thunder: 0,
      dragon: 0,
      ice: 0,
    },
  });
};

const updateLoadoutArmorMeta = (
  data = {},
  armorTypeAndId = null,
  armorsList = {},
) => {
  if (armorTypeAndId) {
    _.set(data, "armor_meta", {
      defense: {
        base: data.armor_meta.defense.base + armorsList[armorTypeAndId].defense.base,
        max: data.armor_meta.defense.max + armorsList[armorTypeAndId].defense.max,
        augmented: data.armor_meta.defense.augmented + armorsList[armorTypeAndId].defense.augmented,
      },
      resistances: {
        fire: data.armor_meta.resistances.fire + armorsList[armorTypeAndId].resistances.fire,
        water: data.armor_meta.resistances.water + armorsList[armorTypeAndId].resistances.water,
        thunder: data.armor_meta.resistances.thunder + armorsList[armorTypeAndId].resistances.thunder,
        dragon: data.armor_meta.resistances.dragon + armorsList[armorTypeAndId].resistances.dragon,
        ice: data.armor_meta.resistances.ice + armorsList[armorTypeAndId].resistances.ice,
      },
    });
  }
  return false;
};

export const retrieveMyLoadouts = () => async (dispatch, getState) => {
  const { armors } = getState().warehouse;
  const myLoadoutsFromDb = await getMyLoadouts();
  const returnedData = Object.assign({}, myLoadoutsFromDb);
  const { builds } = returnedData.data;

  if (myLoadoutsFromDb && armors) {
    const updatedBuilds = Object.keys(builds).map((result) => {
      const loadout = Object.assign({}, builds[result]);
      defaultLoadoutArmorMeta(loadout);

      const {
        head, chest, waist, gloves, legs,
      } = loadout.armor_set;

      updateLoadoutArmorMeta(loadout, head, armors);
      updateLoadoutArmorMeta(loadout, chest, armors);
      updateLoadoutArmorMeta(loadout, gloves, armors);
      updateLoadoutArmorMeta(loadout, waist, armors);
      updateLoadoutArmorMeta(loadout, legs, armors);

      return loadout;
    });

    const updatedLoadoutsData = _.keyBy(updatedBuilds, "name");

    _.set(returnedData, "data.builds", updatedLoadoutsData);

    dispatch({
      type: RETRIEVE_MY_LOADOUTS,
      payload: myLoadoutsFromDb,
    });
  }

  return false;
};

export const retrieveDbLoadouts = () => async (dispatch, getState) => {
  const { armors } = await getState().warehouse;
  const dbLoadouts = await getAllLoadouts();
  const normalizedData = _.keyBy(dbLoadouts, "user");
  const loadouts = Object.assign({}, normalizedData);

  const updatedUsersLoadouts = Object.keys(loadouts).map((userId) => {
    const theirLoadouts = loadouts[userId].data.builds;
    const updatedBuilds = Object.keys(theirLoadouts).map((loadoutName) => {
      const loadout = Object.assign({}, theirLoadouts[loadoutName]);
      defaultLoadoutArmorMeta(loadout);

      const {
        head, chest, waist, gloves, legs,
      } = loadout.armor_set;

      updateLoadoutArmorMeta(loadout, head, armors);
      updateLoadoutArmorMeta(loadout, chest, armors);
      updateLoadoutArmorMeta(loadout, gloves, armors);
      updateLoadoutArmorMeta(loadout, waist, armors);
      updateLoadoutArmorMeta(loadout, legs, armors);

      return loadout;
    });
    const normalizedBuilds = _.keyBy(updatedBuilds, "name");
    _.set(loadouts[userId].data, "builds", normalizedBuilds);

    const result = loadouts[userId];
    return result;
  });

  const finalLoadouts = _.keyBy(updatedUsersLoadouts, "user");
  dispatch({
    type: RETRIEVE_DB_LOADOUTS,
    payload: finalLoadouts,
  });
};

export const clearLoadouts = () => dispatch => dispatch({ type: CLEAR_LOADOUTS });

// ======================= Reducers ======================= //
const initialState = {
  builds: {},
  database: {},
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
        name: action.payload,
        armor_set: { ...initialStateForArmor },
        weapon_set: {
          primary: null,
        },
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
    case REMOVE_LOADOUT: {
      const newState = Object.assign({}, state);
      const updatedLoadouts = action.payload;
      _.set(newState, "builds", updatedLoadouts);
      console.log(newState);
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
      const { builds = {} } = action.payload.data;
      if (builds) {
        Object.keys(builds).map((loadoutNames) => {
          newState.builds[loadoutNames] = builds[loadoutNames];
        });
        return newState;
      }
      return state;
    }
    case RETRIEVE_DB_LOADOUTS: {
      const newState = Object.assign({}, state);
      _.set(newState, "database", action.payload);
      return newState;
    }
    case CLEAR_LOADOUTS:
      return {
        builds: {},
        database: {},
      };
    default:
      return state;
  }
}

export default loadouts;
