<template>
  <template v-if="authStore.isAuthenticated">
    <TheTasks />
  </template>
  <template v-else>
    <TheDashboard />
  </template>
</template>

<script setup>
// import TheDashboard from "./TheDashboard.vue";
// import TheTasks from "./TheTasks.vue";
import { defineAsyncComponent } from "vue";

import { useAuthStore } from "../components/store/userAuth";
console.log(process.env.VUE_APP_BACKEND_URL);

const TheDashboard = defineAsyncComponent(() => import("./TheDashboard.vue"));
const TheTasks = defineAsyncComponent(() => import("./TheTasks.vue"));

const authStore = useAuthStore();

if (localStorage.getItem("user")) {
  authStore.isAuthenticated = true;
} else {
  authStore.isAuthenticated = false;
}
</script>
