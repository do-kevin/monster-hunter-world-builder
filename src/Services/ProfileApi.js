import api from "Services/Api";

async function createProfile(user = null, fname = '', lname = '', birthDate = '', phoneNum = '') {
  const data = {
    user,
    first_name: fname,
    last_name: lname,
    birth_date: birthDate,
    phone_number: phoneNum,
  };
  return api.post("/user_profiles/", data);
}

async function updateProfile(id, user, fname = '', lname = '', birthDate = '', phoneNum = '', avatar = null) {
  const data = {
    user,
    first_name: fname,
    last_name: lname,
    birth_date: birthDate,
    phone_number: phoneNum,
    avatar,
  };
  return api.put(`/user_profiles/${id}/`, data);
}

async function getProfile() {
  return api.get("/user_profiles/me");
}

export {
  getProfile,
  updateProfile,
  createProfile,
};
