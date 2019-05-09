import axios from "axios";

async function requestAllArmors() {
  const request = await axios({
    url: "https://mhw-db.com/armor/",
    method: "GET",
  });
  console.log(request);
  return request;
}

export {
  requestAllArmors,
};
