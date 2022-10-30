import axios from "axios";
import { useAuthStore } from "../src/components/store/userAuth.js";

axios.defaults.baseURL = "http://localhost:8000/";

axios.interceptors.response.use(
  //onFulfilled
  (response) => response,
  //onRejected
  (error) => {
    const status = error.response.status;
    if (status === 401) {
      const authStore = useAuthStore();
      authStore.logout();
    }
    return Promise.reject(error);
  }
);
