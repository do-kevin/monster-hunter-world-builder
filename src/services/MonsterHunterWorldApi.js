import axios from "axios";

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

export {
  requestAllArmors,
  requestAllWeapons,
};
