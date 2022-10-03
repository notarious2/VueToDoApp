<template>
  <div class="post-it">
    <h1>{{ authStore.token }}</h1>
  </div>
  <div class="post-it">
    <p>{{ authStore.token }}</p>
  </div>
  <div class="post-it">
    <h1>Hello tasks Hello tasks Hello tasks Hello tasks</h1>
  </div>
  <div class="post-it">
    <h1>Hello tasks</h1>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/userAuth";
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
