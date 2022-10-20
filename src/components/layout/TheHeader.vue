<template>
  <header>
    <img src="../../assets/note.png" alt="" />

    <nav>
      <h1><router-link to="/tasks"> to-do app </router-link></h1>
      <h3 class="greetings">
        Hello <span>{{ helloUser }}!</span>
      </h3>
    </nav>
    <button class="button-74" @click="authStore.logout()">Logout</button>
  </header>
</template>

<script setup>
import { useAuthStore } from "../store/userAuth.js";
const authStore = useAuthStore();
const helloUser = JSON.parse(localStorage.getItem("user")).username;
</script>

<style scoped>
header {
  grid-area: header;
  margin-top: 2px;
  background-color: bisque;
  /* making HEADER inside of the grid flexbox */
  display: flex;
  justify-content: center;
  align-items: center;
}

.greetings {
  margin-left: 30%;
  margin-top: 25px;
  align-items: center;
}
.greetings span {
  color: #127b14;
}

header nav {
  margin-left: 10px;
  display: flex;
  width: 100%;
}

header a {
  text-decoration: none;
  color: black;
}

.button-74 {
  background-color: #fbeee0;
  border: 2px solid #422800;
  border-radius: 25px;
  box-shadow: #422800 3px 3px 0 0;
  color: #422800;
  cursor: pointer;
  font-weight: 300;
  font-size: 16px;
  padding: 3px 18px;
  line-height: 20px;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  flex: 0;
  margin-right: 15px;
  flex-basis: 100px;
}

header img {
  width: 30px;
  margin-left: 10px;
}

.button-74:hover {
  background-color: #fff;
}

.button-74:active {
  box-shadow: #422800 2px 2px 0 0;
  transform: translate(2px, 2px);
}
</style>
