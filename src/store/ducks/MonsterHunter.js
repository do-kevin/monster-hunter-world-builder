import { requestAllArmors } from "services/MonsterHunterWorldApi";

// ==== Types ==== //
const RETRIEVE_ALL_ARMORS = "RETRIEVE_ALL_ARMORS";

// ==== Actions ==== //

export const retrieveAllArmors = () => async (dispatch) => {
  const response = await requestAllArmors();
  const { data } = response;

  dispatch({
    type: RETRIEVE_ALL_ARMORS,
    payload: data,
  });
};

// ======================= Reducers ======================= //
const armory = [];

export function armors(state = armory, action) {
  switch (action.type) {
    case RETRIEVE_ALL_ARMORS:
      return action.payload;
    default:
      return state;
  }
}
