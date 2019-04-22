import api from "Services/Api";
import Auth from "Services/Auth/Auth";

async function registerEmail(email = "") {
  return api.post("/users/", { email });
}

async function verifyEmail(user_id = "", token = "") {
  const response = await api.post(`/users/${user_id}/verify/`, {
    confirmation_token: token,
  });
  if (response) {
    api.setToken(response.token);
    Auth.setAuthenticated();
  }
}

async function logout(callback) {
  await api.reset();
  await Auth.setNotAuthenticated();
  if (callback) callback();
}

async function setPassword(userId = "", newPassword = "") {
  const data = {
    password: newPassword,
  };
  return api.post(`/users/${userId}/set_password/`, data);
}

async function createProfile(profile) {
  return api.post("/user_profiles/", profile);
}

async function getProfile(userId) {
  return api.get(`/user_profiles/${userId}/`);
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
  logout,
};
