/* eslint-disable no-console */
import axios from 'axios';
import queryString from 'query-string';

const defaultConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

async function registerEmail(userEmail = '') {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_SERVER_URL}/users/`, {
      email: userEmail,
    }, defaultConfig);
    return response;
  } catch (error) {
    return error;
  }
}

async function verifyEmail(userId = '', userToken = '') {
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  try {
    const response = await axios.post(`${process.env.REACT_APP_API_SERVER_URL}/users/${userId}/verify/`, queryString.stringify({
      confirmation_token: userToken,
    }), axiosConfig);
    return response.data;
  } catch (error) {
    return error;
  }
}

async function setPassword(userId = '', authToken = '', newPassword = '') {
  const postData = {
    password: newPassword,
  };

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${authToken}`,
    },
  };

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_SERVER_URL}/users/${userId}/set_password/`, postData, axiosConfig,
    );
    return response.data;
  } catch (error) {
    return error;
  }
}

// eslint-disable-next-line no-unused-vars
async function createProfile(userId = '', authToken = '', firstName = '', lastName = '', birthDate = '', phoneNum = '') {
  const postData = {
    user: 1,
    first_name: firstName,
    last_name: lastName,
    birth_date: birthDate,
    phone_number: phoneNum,
  };

  const axiosConfig = {
    headers: {
      Authorization: `Token ${authToken}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.post(`${process.env.REACT_APP_API_SERVER_URL}/user_profiles/`, postData, axiosConfig);
    return response;
  } catch (error) {
    return error;
  }
}

async function resetPassword(userEmail = '') {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_SERVER_URL}/users/request_reset_password/`, {
      email: userEmail,
    }, defaultConfig);
    return response;
  } catch (error) {
    return error;
  }
}

async function userLogin(userEmail = '', userPwd = '') {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_SERVER_URL}/login/`, {
      email: userEmail,
      password: userPwd,
    }, defaultConfig);
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
}


export {
  registerEmail, verifyEmail, setPassword, resetPassword, userLogin, createProfile,
};
