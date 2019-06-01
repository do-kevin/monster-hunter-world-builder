import { listAllProfiles } from "services/ProfileApi";

// ======================= Constants ======================= //
const RETRIEVE_USER_LIST = "RETRIEVE_USER_LIST";
const CLEAR_USER_LIST = "CLEAR_USER_LIST";

// ======================= Actions ======================= //

export const retrieveUserList = () => async (dispatch) => {
  const data = await listAllProfiles();
  console.log(data);
  dispatch({
    type: RETRIEVE_USER_LIST,
    payload: data,
  });
};

export const clearUserList = () => dispatch => dispatch({ type: CLEAR_USER_LIST });

// ======================= Reducers ======================= //
const userList = [];

function list(state = userList, action) {
  switch (action.type) {
    case RETRIEVE_USER_LIST:
      return action.payload;
    case CLEAR_USER_LIST:
      return userList;
    default:
      return state;
  }
}

export default list;
