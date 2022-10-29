<template>
  <template v-if="authStore.isAuthenticated">
    <TheTasks />
  </template>
  <template v-else>
    <TheDashboard />
  </template>
</template>

<script setup>
import TheDashboard from "./TheDashboard.vue";
import TheTasks from "./TheTasks.vue";
import { useAuthStore } from "../components/store/userAuth";
const authStore = useAuthStore();
</script>
