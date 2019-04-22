import { UPDATE_PROFILE, USER_LOGOUT } from './constants';

export const authLogin = (token, id) => dispatch => dispatch({
  type: UPDATE_PROFILE,
  payload: {
    token,
    user: id,
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

export const mountProfile = (id, user, first_name, last_name, birth_date, phone_number, avatar) => dispatch => dispatch({
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

export const putNewProfileInfo = (returnedData = {}) => dispatch => dispatch({
  type: UPDATE_PROFILE,
  payload: returnedData,
});

export const userLogout = () => dispatch => dispatch({ type: USER_LOGOUT });
