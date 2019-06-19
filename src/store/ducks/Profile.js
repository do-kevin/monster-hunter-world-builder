import {
  createProfile,
  updateProfile as updateProfileReq,
  getProfile as getProfileReq,
} from "services/ProfileApi";
import { createSelector } from "reselect";

// ======================= Constants ======================= //

const UPDATE_PROFILE = "UPDATE_PROFILE";
const USER_LOGOUT = "USER_LOGOUT";
const GET_PROFILE = "GET_PROFILE";
const SET_TOKEN_ID = "SET_TOKEN_ID";

// ======================= Actions ======================= //

export const setTokenUserId = (token, userId) => dispatch => dispatch({
  type: SET_TOKEN_ID,
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
      type: GET_PROFILE,
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
    case SET_TOKEN_ID:
      return Object.assign({}, state, action.payload);
    case UPDATE_PROFILE:
      return Object.assign({}, state, action.payload);
    case GET_PROFILE:
      return Object.assign({}, state, action.payload);
    case USER_LOGOUT:
      return profileState;
    default:
      return state;
  }
}

export default profile;

const profileSelector = state => state.profile;

export const enhanceProfile = createSelector(profileSelector, (profile) => {
  return { ...profile, full_name: profile.first_name + " " + profile.last_name };
});
