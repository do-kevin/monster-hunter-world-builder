import { UPDATE_PROFILE, USER_LOGOUT } from './Constants';

export const setTokenUserId = (token, userId) => dispatch => dispatch({
  type: UPDATE_PROFILE,
  payload: {
    token,
    user: userId,
  },
});

export const updateProfile = (user = null, fname = '', lname = '', birthDate = '', phoneNum = '') => dispatch => dispatch({
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
