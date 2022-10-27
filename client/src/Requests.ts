//import { REQ_URL } from "util/secrets";

//const URL = REQ_URL;

const URL = "http://localhost:4000/api/v1/books";

const requests = {
  fetchFantasy: `${URL}/book/Fantasy`,
  fetchHorror: `${URL}/book/Horror`,
  fetchScifi: `${URL}/book/Scifi`,
};

export default requests;
