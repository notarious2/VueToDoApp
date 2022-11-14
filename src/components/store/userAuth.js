import { defineStore } from "pinia";
import axios from "axios";
import router from "../../router.js";
import refreshHeader from "../services/refresh-header";
// import authHeader from "../services/auth-header";

export const useAuthStore = defineStore("authentication", {
  state: () => ({
    token: "",
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem("user")),
    errorLogIn: false,
    isAuthenticated: false,
  }),
  actions: {
    async login(username, password) {
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);

      const headers = {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      };
      await axios
        .post("login", params, {
          headers: headers,
        })
        .then((response) => {
          // store user details and jwt in local storage to keep user logged in between page refreshes
          localStorage.setItem("user", JSON.stringify(response.data));
          // update pinia state
          this.token = response.data["access_token"];
          this.isAuthenticated = true;
          router.push({ name: "Home" });
        })
        .catch((error) => {
          console.log(error);
          this.errorLogIn = true;
        });
    },
    async register(payload) {
      await axios
        .post("user", payload)
        .then((response) => {
          router.push({ name: "Authorization" });
          console.log(
            `User ${response.data.username} has been successfully created!`
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },
    logout() {
      this.token = null;
      localStorage.removeItem("user");
      this.isAuthenticated = false;
      location.reload();
    },

    async refreshToken() {
      const refreshToken = await axios.get("refresh", {
        headers: refreshHeader(),
      });
      var existing = localStorage.getItem("user");
      existing = JSON.parse(existing);
      console.log(existing.access_token);
      existing["access_token"] = refreshToken.data.access_token;
      console.log("REFRESHING!", refreshToken.data.access_token);
      localStorage.setItem("user", JSON.stringify(existing));
      return refreshToken.data.access_token;
    },

    clearError() {
      this.errorLogIn = false;
    },
  },
  persist: {
    enabled: true,
  },
});
