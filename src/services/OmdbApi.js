import axios from "axios";

async function search(field = "") {
  return axios({
    url: "http://www.omdbapi.com",
    method: "GET",
    params: {
      "apikey": process.env.REACT_APP_OMDB_KEY,
      s: field,
    },
  });
}

export {
  search,
};
