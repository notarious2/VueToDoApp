import { defineStore } from "pinia";
import axios from "axios";
import router from "../../router.js";

export const useAuthStore = defineStore("authentication", {
  state: () => ({
    token: "",
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem("user")),
    errorLogIn: false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
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
          router.push({ path: "/tasks" });
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
          router.push({ path: "/auth" });
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
      router.push("/auth");
    },

    clearError() {
      this.errorLogIn = false;
    },
  },
  persist: {
    enabled: true,
  },
});
