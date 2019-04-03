/* eslint-disable no-console */
import axios from 'axios';

async function registerEmail(userEmail = '') {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_SERVER_URL}/users/`, {
      email: userEmail,
    });
    return response;
  } catch (error) {
    return error;
  }
}

async function verifyEmail(userId = '', userToken = '') {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_SERVER_URL}/users/${userId}/verify/`, {
      confirmation_token: userToken,
    });
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
}


export { registerEmail, verifyEmail };
