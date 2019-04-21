/* eslint-disable no-console */
import axios from 'axios';
import queryString from 'query-string';
import api from 'Services/Api';

async function registerEmail(email = '') {
  return api.post('/users/', { email });
}

async function verifyEmail(id = '', firstToken = '') {
  const data = queryString.stringify({
    confirmation_token: firstToken,
  });
  return api.post(`/users/${id}/verify/`, data);
}

async function setPassword(userId = '', newPassword = '') {
  const data = {
    password: newPassword,
  };
  return api.post(`/users/${userId}/set_password/`, data);
}

async function createProfile(userId = '', authToken = '', firstName = '', lastName = '', birthDate = '', phoneNum = '') {
  const postData = {
    user: userId,
    first_name: firstName,
    last_name: lastName,
    birth_date: birthDate,
    phone_number: phoneNum,
  };

  const authConfig = {
    headers: {
      Authorization: `Token ${authToken}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.post(`${process.env.REACT_APP_API_SERVER_URL}/user_profiles/`, postData, authConfig);

    return response;
  } catch (error) {
    return console.log(error);
  }
}

async function getProfile(userId, authToken = '') {
  const authConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Token ${authToken}`,
    },
  };

  try {
    const response = await axios.get(`${process.env.REACT_APP_API_SERVER_URL}/user_profiles/${userId}/`, authConfig);
    return response;
  } catch (err) {
    console.error(err);
    return 'Not found';
  }
}

async function resetPassword(email = '') {
  return api.post('/users/request_reset_password/', { email });
}

async function userLogin(email = '', password = '') {
  const response = await api.post('/login/', { email, password });
  if (response.status === 200) {
    api.authInstance(response.data.token);
  }
  return response;
}


export {
  registerEmail, verifyEmail, setPassword, resetPassword, userLogin, createProfile, getProfile,
};
