import {
  createProfile,
  updateProfile as updateProfileReq,
  getProfile as getProfileReq,
} from "services/ProfileApi";

// ======================= Constants ======================= //

const UPDATE_PROFILE = "UPDATE_PROFILE";
const USER_LOGOUT = "USER_LOGOUT";

// ======================= Actions ======================= //

export const setTokenUserId = (token, userId) => dispatch => dispatch({
  type: UPDATE_PROFILE,
  payload: {
    token,
    user: userId,
  },
});

export const createNewProfile = (
  user = null,
  fname = "",
  lname = "",
  birthDate = "",
  phoneNum = "",
) => async (dispatch) => {
  const response = await createProfile(user, fname, lname, birthDate, phoneNum);
  if (response) {
    dispatch({
      type: UPDATE_PROFILE,
      payload: response,
    });
    return true;
  }
  return false;
};

export const updateProfile = (user = null, fname = "", lname = "", birthDate = "", phoneNum = "") => dispatch => dispatch({
  type: UPDATE_PROFILE,
  payload: {
    user,
    first_name: fname,
    last_name: lname,
    birth_date: birthDate,
    phone_number: phoneNum,
  },
});

export const getProfile = () => async (dispatch) => {
  const response = await getProfileReq();
  if (response) {
    dispatch({
      type: UPDATE_PROFILE,
      payload: response,
    });
    return true;
  }
  return false;
};

export const fullProfileUpdate = (
  id = null,
  user = null,
  fname = "",
  lname = "",
  birthdate = "",
  phonenum = "",
) => async (dispatch) => {
  const response = await updateProfileReq(
    id,
    user,
    fname,
    lname,
    birthdate,
    phonenum,
  );

  dispatch({
    type: UPDATE_PROFILE,
    payload: response,
  });
};

export const userLogout = () => dispatch => dispatch({ type: USER_LOGOUT });

// ======================= Reducers ======================= //

const profileState = {
  user: null,
};

function profile(state = profileState, action) {
  switch (action.type) {
    case UPDATE_PROFILE:
      return Object.assign({}, state, action.payload);
    case USER_LOGOUT:
      return profileState;
    default:
      return state;
  }
}

export default profile;