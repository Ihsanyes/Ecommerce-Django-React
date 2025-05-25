import axios from "axios";
import { getAccessToken } from "./auth"; // adjust path
import { API_URL } from "../../Api_urls";
// import { useEffect } from "react";
import { autoLogout } from "./auth";

const axiosInstance = axios.create({
  baseURL:API_URL, // or use API_URL variable
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    console.log("tokennnnn", token)
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// 1. In axiosInstance
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      autoLogout();
      // prevent redirect loop if already on login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// 2. In App.jsx or Navbar.jsx
// useEffect(() => {
//   setupAutoLogout(logout); // auto logout when token time ends
// }, []);


export default axiosInstance;
