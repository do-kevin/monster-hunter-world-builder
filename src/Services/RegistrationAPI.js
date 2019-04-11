/* eslint-disable no-console */
import axios from 'axios';
import queryString from 'query-string';
import NProgress from 'multi-nprogress';

const defaultConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const urlencodedConfig = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

async function registerEmail(userEmail = '') {
  const nprogress = NProgress();
  nprogress.set(0.0);
  try {
    nprogress.set(0.5);
    const response = await axios.post(`${process.env.REACT_APP_API_SERVER_URL}/users/`, {
      email: userEmail,
    }, defaultConfig);
    nprogress.set(1.0);
    return response;
  } catch (error) {
    return 'Code 401: Invalid email or password.';
  }
}

async function verifyEmail(userId = '', userToken = '') {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_SERVER_URL}/users/${userId}/verify/`, queryString.stringify({
      confirmation_token: userToken,
    }), urlencodedConfig);
    return response.data;
  } catch (error) {
    return 'Code 500: User id and/or token may not be correct. Please check your url and refresh.';
  }
}

async function setPassword(userId = '', authToken = '', newPassword = '') {
  const postData = {
    password: newPassword,
  };

  const authConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${authToken}`,
    },
  };

  const nprogress = NProgress();
  nprogress.set(0.0);

  try {
    nprogress.set(0.45);
    const response = await axios.post(
      `${process.env.REACT_APP_API_SERVER_URL}/users/${userId}/set_password/`, postData, authConfig,
    );
    nprogress.set(1.0);
    return response.data;
  } catch (error) {
    return error;
  }
}

async function createProfile(userId = '', authToken = '', firstName = '', lastName = '', birthDate = '', phoneNum = '') {
  const nprogress = NProgress();
  nprogress.set(0.0);

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
    nprogress.set(0.33);
    const response = await axios.post(`${process.env.REACT_APP_API_SERVER_URL}/user_profiles/`, postData, authConfig);
    nprogress.set(1.0);
    return response;
  } catch (error) {
    return console.log(error);
  }
}

async function resetPassword(userEmail = '') {
  const nprogress = NProgress();
  nprogress.set(0.0);
  try {
    nprogress.set(0.66);
    const response = await axios.post(`${process.env.REACT_APP_API_SERVER_URL}/users/request_reset_password/`, {
      email: userEmail,
    }, defaultConfig);
    nprogress.set(1.0);
    return response;
  } catch (error) {
    return 'This account does not exist.';
  }
}

async function userLogin(userEmail = '', userPwd = '') {
  const nprogress = NProgress();
  nprogress.set(0.0);
  try {
    nprogress.set(0.5);
    const response = await axios.post(`${process.env.REACT_APP_API_SERVER_URL}/login/`, {
      email: userEmail,
      password: userPwd,
    }, defaultConfig);
    nprogress.set(1.0);
    return response;
  } catch (error) {
    return 'Code 401: Invalid email or password.';
  }
}


export {
  registerEmail, verifyEmail, setPassword, resetPassword, userLogin, createProfile,
};
