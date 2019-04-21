/* eslint-disable no-console */
import api from "services/Api";
import axios from "axios";
import Auth from "./Auth";

/* eslint-disable no-console */

async function registerEmail(email = "") {
  return api.post("/users/", { email });
}

async function verifyEmail(user_id = "", token = "") {
  const response = await api.post(`/users/${user_id}/verify/`, {
    confirmation_token: token
  });
  if (response) {
    api.setToken(response.token);
    Auth.setAuthenticated();
  }
}

async function logout() {
  api.reset();
  Auth.setNotAuthenticated();
}

async function setPassword(userId = "", newPassword = "") {
  const data = {
    password: newPassword
  };
  return api.post(`/users/${userId}/set_password/`, data);
}

async function createProfile(profile) {
  return api.post("/user_profiles/", profile);
}

async function getProfile(userId, authToken = "") {
  const authConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Token ${authToken}`
    }
  };

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER_URL}/user_profiles/${userId}/`,
      authConfig
    );
    return response;
  } catch (err) {
    console.error(err);
    return "Not found";
  }
}

async function resetPassword(email = "") {
  return api.post("/users/request_reset_password/", { email });
}

async function userLogin(email = "", password = "") {
  const response = await api.post("/login/", { email, password });
  if (response) {
    Auth.setAuthenticated();
    api.setToken(response.token);
  }
  return response;
}

export {
  registerEmail,
  verifyEmail,
  setPassword,
  resetPassword,
  userLogin,
  createProfile,
  getProfile,
  logout
};
