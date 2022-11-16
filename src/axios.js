import axios from "axios";
import { useAuthStore } from "../src/components/store/userAuth.js";
// import authHeader from "../src/components/services/auth-header";

// axios.defaults.baseURL = "https://fastapi-todo-heroku.herokuapp.com/";
// axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.baseURL = "https://web-production-b464.up.railway.app";

// axios interceptor for specific URL - instance
// var instance = axios.create({
//   baseURL: "https://web-production-b464.up.railway.app/task",
// });
//response interceptor
axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async function (error) {
    console.log("hello");
    console.log(error);
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const authStore = useAuthStore();
      await authStore.refreshToken();
      // const access_token = await authStore.refreshToken();
      // axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
      location.reload();
      return [null, await axios.request(originalRequest)];
    }
    return Promise.reject(error);
  }
);

// instance.interceptors.request.use(
//   (res) => {
//     return res;
//   },
//   async function (error) {
//     console.log("hello");
//     console.log(error);
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const authStore = useAuthStore();
//       await authStore.refreshToken();
//       // const access_token = await authStore.refreshToken();
//       // axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
//       location.reload();
//       return [null, await axios.request(originalRequest)];
//     }
//     return Promise.reject(error);
//   }
// );

// axios.interceptors.response.use(
//   //onFulfilled
//   (response) => response,
//   //onRejected
//   (error) => {
//     console.log("401 ERROR I GUESS");
//     const status = error.response.status;
//     if (status === 401) {
//       const authStore = useAuthStore();
//       authStore.refreshToken();
//     }
//     return Promise.reject(error);
//   }
// );
