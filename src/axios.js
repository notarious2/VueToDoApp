import axios from "axios";
import { useAuthStore } from "../src/components/store/userAuth.js";
// import authHeader from "../src/components/services/auth-header";

// axios.defaults.baseURL = "https://fastapi-todo-heroku.herokuapp.com/";
// axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URL;

// axios interceptor for specific URL - instance

//response interceptor
axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async function (error) {
    // refresh token
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      error.request.responseURL.includes(axios.defaults.baseURL + "/task")
    ) {
      originalRequest._retry = true;
      const authStore = useAuthStore();
      const newAccessToken = await authStore.refreshToken();
      // const access_token = await authStore.refreshToken();
      originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;
      return axios.request(originalRequest);
    }
    // other errors such as token does not exist -> after user was deleted
    else if (error.response.data.detail === "Could not validate credentials") {
      const authStore = useAuthStore();
      authStore.logout();
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
