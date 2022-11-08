import axios from "axios";
const baseURL = process.env.REACT_APP_BASE_API_URL;
export const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const protectApi = axios.create({
  baseURL,
  headers,
  timeout: 10000,
});

protectApi.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    throw error;
  }
);

protectApi.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    if (err.refrechError) {
      localStorage.setItem("token", null);
      return;
    }
    const originalConfig = err.config;
    if (originalConfig.url !== "/auth/signin" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const refreshToken = localStorage.getItem("refreshToken");
          const rs = await axios.post(baseURL + "/admin/auth/refresh", {
            refreshToken,
          });
          const accessToken = rs?.data?.accessToken;
          localStorage.setItem("token", accessToken);

          return protectApi(originalConfig);
        } catch (_error) {
          if (_error?.response?.status == "401") logout();

          return Promise.reject({ ..._error, refrechError: true });
        }
      }
    }

    return Promise.reject(err);
  }
);

const logout = () => {
  localStorage.clear();
  window.location.reload();
};

export const getData = (url, params = "") =>
  protectApi.get(`/${url}`, { params });
export const getOne = (url, id) => protectApi.get(`/${url}/${id}`);
export const getMe = (url) => protectApi.get(`/${url}`);
export const updateOne = (url, id = "", item) =>
  protectApi.put(`/${url}/${id}`, item);
export const createOne = (url, data) => protectApi.post(`/${url}`, data);
export const deleteOne = (url, id) => protectApi.delete(`/${url}/${id}`);
export default protectApi;
