<template>
  <div class="container">
    <div class="post-it">
      <form @submit.prevent="submitAuthDetails">
        <div class="container">
          <h1>Login</h1>
          <div class="icon-div">
            <!-- <label for="uname">Username</label> -->
            <font-awesome-icon icon="far fa-user" class="fa-icons" />
            <input
              type="text"
              placeholder="Username"
              name="uname"
              required
              v-model="username"
            />
          </div>
          <div class="icon-div">
            <!-- <label for="psw">Password</label> -->
            <font-awesome-icon icon="fas fa-key" class="fa-icons" />

            <input
              id="inline-input"
              :type="passwordType"
              placeholder="Password"
              name="psw"
              required
              v-model="password"
            />
            <a id="icon" @click="toggleShow">
              <font-awesome-icon
                v-if="showPassword"
                :icon="['fas', 'fa-eye']"
              />
              <font-awesome-icon v-else :icon="['fas', 'fa-eye-slash']" />
            </a>
          </div>
          <button class="button-74" type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const username = ref("");
const password = ref("");
const showPassword = ref(false);
const passwordType = ref("password");
let success = ref(false);

function toggleShow() {
  showPassword.value = !showPassword.value;
  if (showPassword.value) {
    passwordType.value = "text";
  } else {
    passwordType.value = "password";
  }
}
function submitAuthDetails() {
  const params = new URLSearchParams();
  params.append("username", username.value);
  params.append("password", password.value);

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  };
  axios
    .post("http://localhost:8000/login", params, {
      headers: headers,
    })
    .then((response) => {
      success.value = true;
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>

<style scoped>
* {
  font-family: "Kalam", cursive;
}

.container {
  width: 200px;
  margin: 50px auto;
}

#icon {
  margin-right: 10px;
}

.fa-icons {
  font-size: 18px;
  margin-left: 5px;
}

.icon-div {
  display: flex;
  flex-direction: row;
  border: 1px solid #374669;
  border-radius: 5px;
  background: #fff;
  align-items: center;
  overflow: hidden;
  margin-top: 2px;
}
.icon-div input {
  outline: none;
  border: none;
  background: none;
  font-size: 1em;
  padding: 0.5em;
  color: inherit;
  flex: auto 1 1;
  width: 100%;
  background: none;
  background-color: transparent;
}

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
}
.post-it::after {
  content: "";
  display: inline-block;
  position: absolute;
  width: 2.13em;
  height: 2.13em;
  bottom: 0;
  right: 0;
  background: linear-gradient(-45deg, transparent 1.1em, #e3d842) bottom right;
}

.button-74 {
  background-color: #fbeee0;
  border: 2px solid #422800;
  border-radius: 25px;
  box-shadow: #422800 4px 4px 0 0;
  color: #422800;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  font-size: 18px;
  padding: 0 18px;
  line-height: 40px;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-top: 10px;
}

.button-74:hover {
  background-color: #fff;
}

.button-74:active {
  box-shadow: #422800 2px 2px 0 0;
  transform: translate(2px, 2px);
}

@media (min-width: 768px) {
  .button-74 {
    min-width: 120px;
    padding: 0 25px;
  }
}
</style>
