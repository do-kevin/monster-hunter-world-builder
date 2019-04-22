/* eslint-disable import/prefer-default-export */
import { UPDATE_PROFILE } from './constants';

export const updateProfile = (token, id) => (dispatch) => {
  dispatch({
    type: UPDATE_PROFILE,
    payload: {
      token,
      user: id,
    },
  });
};
