import { defineStore } from "pinia";
import axios from "axios";
import { router } from "../../main.js";

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
    login(username, password) {
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);

      const headers = {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      };
      axios
        .post("http://localhost:8000/login", params, {
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
          console.log(error.response);
          this.errorLogIn = true;
        });
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
      router.push("/auth");
    },

    clearError() {
      this.errorLogIn = false;
    },
  },
});
