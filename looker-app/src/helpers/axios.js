import axios from "axios";

const Axios = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  timeout: 10000,
});

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    return error;
  }
);

export default Axios;
