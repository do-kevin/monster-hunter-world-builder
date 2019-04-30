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

export const grabId = id => dispatch => dispatch({
  type: UPDATE_PROFILE,
  payload: {
    id,
  },
});

export const fullyUpdateProfile = (
  id, user, first_name, last_name, birth_date, phone_number, avatar,
) => dispatch => dispatch({
  type: UPDATE_PROFILE,
  payload: {
    id,
    user,
    first_name,
    last_name,
    birth_date,
    phone_number,
    avatar,
  },
});

export const updateProfileFromRequest = (returnedData = {}) => dispatch => dispatch({
  type: UPDATE_PROFILE,
  payload: returnedData,
});

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
