import { GRAB_USER_LIST, CLEAR_USER_LIST } from "./Constants";

const list = [];

function userList(state = list, action) {
  switch (action.type) {
    case GRAB_USER_LIST:
      return action.payload;
    case CLEAR_USER_LIST:
      return list;
    default:
      return state;
  }
}

export default userList;
