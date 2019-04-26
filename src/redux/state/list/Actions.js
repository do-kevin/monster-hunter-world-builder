import { GRAB_USER_LIST, CLEAR_USER_LIST } from "./Constants";

export const grabUserList = (userList = []) => dispatch => dispatch({
  type: GRAB_USER_LIST,
  payload: userList,
});

export const clearUserList = () => dispatch => dispatch({ type: CLEAR_USER_LIST });
