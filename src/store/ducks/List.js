// ======================= Constants ======================= //
const GRAB_USER_LIST = "GRAB_USER_LIST";
const CLEAR_USER_LIST = "CLEAR_USER_LIST";

// ======================= Actions ======================= //
export const grabUserList = (userList = []) => dispatch => dispatch({
  type: GRAB_USER_LIST,
  payload: userList,
});

export const clearUserList = () => dispatch => dispatch({ type: CLEAR_USER_LIST });

// ======================= Reducers ======================= //
const userList = [];

function list(state = userList, action) {
  switch (action.type) {
    case GRAB_USER_LIST:
      return action.payload;
    case CLEAR_USER_LIST:
      return userList;
    default:
      return state;
  }
}

export default list;
