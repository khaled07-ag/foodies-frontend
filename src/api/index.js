import axios from "axios";

const instance = axios.create({
  baseURL: "https://pets-react-query-backend.eapi.joincoded.com",
});

export default instance;
