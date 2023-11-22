import axios from "axios";


const axiosAuthInstance = axios.create({
    baseURL: "http://restaurantapitest.smartvillageqatar.com/",
    Accept: "application/json",
    "Content-Type": "application/json"
})

// axiosAuthInstance.interceptors.request.use(function (config) {
//     const token = localStorage.getItem("token");
//     config.headers.Authorization = token ? `Bearer ${token}` : "";
//     return config;
// });

axiosAuthInstance.interceptors.request.use(
    config => {
      config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
          return config;
      },
      error => {
          return Promise.reject(error);
      }
  );

export default axiosAuthInstance;