import axios from "axios";
import { useAuthStore } from "../src/components/store/userAuth.js";
// import authHeader from "../src/components/services/auth-header";

// axios.defaults.baseURL = "https://fastapi-todo-heroku.herokuapp.com/";
// axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.baseURL =
  "postgresql://postgres:9QwHEVTfq137WwSOwYVY@containers-us-west-127.railway.app:5681/railway";

//response interceptor
axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async function (error) {
    console.log("HERE!", error.response.status);
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
