import axios from "axios";
import api from "services/Api";
import { getProfile } from "services/ProfileApi";

async function requestAllArmors() {
  const request = await axios({
    url: "https://mhw-db.com/armor/",
    method: "GET",
  });
  return request;
}

async function requestAllWeapons() {
  const request = await axios({
    url: "https://mhw-db.com/weapons/",
    method: "GET",
  });
  return request;
}

async function postLoadoutsToDb(builds) {
  const { user } = await getProfile();

  const data = {
    user,
    data: {
      builds,
    },
  };

  const request = await api.post("/mh_data/", data);
  return request;
}

async function getMyLoadouts() {
  const request = await api.get("/mh_data/me");
  return request;
}


async function putUpdatedLoadoutsToDb(builds, databaseSetId) {
  const { user } = await getProfile();

  const data = {
    user,
    data: {
      builds,
    },
  };

  const request = await api.put(`/mh_data/${databaseSetId}/`, data);
  return request;
}

async function getUserLoadoutsById(databaseSetId) {
  const request = await api.get(`/mh_data/${databaseSetId}`);
  return request;
}

export {
  requestAllArmors,
  requestAllWeapons,
  postLoadoutsToDb,
  getMyLoadouts,
  putUpdatedLoadoutsToDb,
  getUserLoadoutsById,
};
