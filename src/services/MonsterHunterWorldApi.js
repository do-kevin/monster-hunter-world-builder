import axios from "axios";

async function requestAllArmors() {
  return axios({
    url: "https://mhw-db.com/armor/",
    method: "GET",
  });
}

export {
  requestAllArmors,
};
