import { defineStore } from "pinia";

export const useAuthStore = defineStore("authentication", {
  state: () => ({
    token: "",
  }),
});
