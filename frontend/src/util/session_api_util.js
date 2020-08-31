import axios from "axios";
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const signup = (userData) => {
  console.log('signpu session_api_util');
  return axios.post("/api/users/register", userData);
};

export const login = (userData) => axios.post("/api/users/login", userData);
