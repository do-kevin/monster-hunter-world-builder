/* eslint-disable import/prefer-default-export */
import { getProfile } from 'Services/RegistrationAPI';
import { GET_PROFILE } from 'Redux/actions/types';
import Promise from 'bluebird';

const fetchAuthToken = (props, context) => ({
  user: context.userId,
  token: context.profileToken,
});

export const fetchProfile = () => (dispatch) => {
  const response = fetchAuthToken();
  getProfile(response.user, response.token)
    .then(result => result.json()
      .then(profile => dispatch({
        type: GET_PROFILE,
        payload: profile,
      })));
};

export const fetchProfileTemp = () => async (dispatch) => {
  // const response = fetchAuthToken();
  // getProfile(response.user, response.token)
  //   .then(result => result.json()
  //     .then(profile => dispatch({
  //       type: GET_PROFILE,
  //       payload: profile,
  //     })));

  await Promise.delay(500);
};
