import { defineStore } from "pinia";
import axios from "axios";
import { router } from "../../main.js";

export const useAuthStore = defineStore("authentication", {
  state: () => ({
    token: "",
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem("user")),
  }),
  actions: {
    login(username, password) {
      const params = new URLSearchParams();
      console.log(username);
      console.log(username.value);
      console.log(password.value);
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

          console.log(this.token);
          router.push({ path: "/tasks" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
      router.push("/auth");
    },
  },
});
