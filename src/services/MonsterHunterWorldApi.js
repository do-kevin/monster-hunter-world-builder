import axios from "axios";
import api from "services/Api";
import { getProfile } from "services/ProfileApi";
import _ from "lodash";

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

async function postLoadoutsToDb(builds = {}) {
  const { user } = await getProfile();

  const newBuilds = Object.keys(builds).map((name) => {
    const loadout = Object.assign({}, builds[name]);
    const pickedProps = _.pick(loadout, ["name", "armor_set", "weapon_set", "armor_meta.previousArmors"]);
    return pickedProps;
  });

  const normalized = _.keyBy(newBuilds, "name");

  const data = {
    user,
    data: {
      builds: normalized,
    },
  };

  const request = await api.post("/mh_data/", data);
  return request;
  // Loadouts.js's retrieveMyLoadouts receives this request
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

async function getAllLoadouts() {
  const request = await api.get("/mh_data/");
  return request;
}

export {
  requestAllArmors,
  requestAllWeapons,
  postLoadoutsToDb,
  getMyLoadouts,
  putUpdatedLoadoutsToDb,
  getUserLoadoutsById,
  getAllLoadouts,
};
