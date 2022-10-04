<template>
  <div class="post-it" v-for="task in tasks" :key="task">
    <h1>{{ task }}</h1>
  </div>
  <!-- <div class="post-it">
    <p>{{ authStore.token }}</p>
  </div> -->
  <button @click="authStore.logout()">Logout</button>
</template>

<script setup>
import { useAuthStore } from "../components/store/userAuth.js";
import authHeader from "@/components/services/auth-header";
import axios from "axios";
import { ref, onMounted } from "vue";

const tasks = ref([]);

async function loadTasks() {
  const response = await axios.get("http://localhost:8000/task", {
    headers: authHeader(),
  });
  const result = response.data;
  for (const key of Object.keys(result)) {
    tasks.value.push(result[key].text);
  }
}

onMounted(() => {
  loadTasks();
});

const authStore = useAuthStore();
console.log(typeof authStore.token);
</script>

<style scoped>
.post-it {
  background: #fefabc;
  padding: 30px;
  font-family: "Gloria Hallelujah", cursive;
  font-size: 15px;
  color: #000;
  width: 200px;
  position: relative;
  /* border-bottom-right-radius: 40px; */
  box-shadow: 0px 4px 6px #333;
  -moz-box-shadow: 0px 4px 6px #333;
  -webkit-box-shadow: 0px 4px 6px #333;
  border-radius: 5px;
  border-bottom-right-radius: 30px;
  margin-bottom: 10px;
}
</style>
