<template>
  <PostIt class="post-it">
    <form @submit.prevent="submitRegistrationDetails">
      <div class="container">
        <h1>Register</h1>
        <div class="icon-div">
          <img src="@/assets/register/user.png" alt="user" class="user-img" />
          <input type="text" placeholder="Name" required v-model="name" />
        </div>
        <div class="icon-div">
          <img
            src="@/assets/register/email.png"
            alt="email"
            class="email-img"
          />
          <input type="text" placeholder="Email" required v-model="email" />
        </div>
        <div class="icon-div">
          <img
            src="@/assets/register/username.png"
            alt="username"
            class="username-img"
          />
          <input
            type="text"
            placeholder="Username"
            required
            v-model="username"
          />
        </div>
        <div class="icon-div">
          <img
            src="@/assets/register/password.png"
            alt="password"
            class="password-img"
          />
          <input
            id="inline-input"
            :type="passwordType"
            placeholder="Password"
            v-model="password"
            required
          />
          <img
            :src="showPassword ? showUrls[0] : showUrls[1]"
            alt="show-password"
            class="show-password-img"
            @click="toggleShow"
          />
        </div>
        <div class="icon-div">
          <img
            alt="password-verification"
            class="verification-img"
            :src="passwordsMatch ? passwordUrls[1] : passwordUrls[0]"
            :class="
              passwordsMatch
                ? 'password-is-confirmed'
                : 'password-not-confirmed'
            "
          />
          <input
            :type="passwordType"
            placeholder="Verify Password"
            v-model="passwordConfirmation"
            required
          />
        </div>
        <button class="button-74" type="submit">Submit</button>
      </div>
    </form>
  </PostIt>
</template>

<script setup>
import { ref, watch } from "vue";
import { useAuthStore } from "../components/store/userAuth.js";
import PostIt from "../components/layout/PostIt.vue";

const authStore = useAuthStore();

const name = ref("");
const email = ref("");
const username = ref("");
const password = ref("");
const passwordConfirmation = ref("");
const showPassword = ref(false);
const passwordType = ref("password");
const passwordsMatch = ref(false);

const passwordUrls = ref([
  require("@/assets/register/locked.png"),
  require("@/assets/register/unlocked.png"),
]);
const showUrls = ref([
  require("@/assets/register/eyes.png"),
  require("@/assets/register/closed_eyes.png"),
]);

function toggleShow() {
  showPassword.value = !showPassword.value;
  if (showPassword.value) {
    passwordType.value = "text";
  } else {
    passwordType.value = "password";
  }
}
async function submitRegistrationDetails() {
  const payload = {
    name: name.value,
    email: email.value,
    username: username.value,
    password: password.value,
  };
  authStore.register(payload);
}

watch([password, passwordConfirmation], () => {
  if (passwordConfirmation.value !== password.value) {
    passwordsMatch.value = false;
  } else {
    passwordsMatch.value = true;
  }
});
</script>

<style scoped>
* {
  font-family: "Kalam", cursive;
}

.user-img,
.email-img,
.username-img {
  width: 25px;
  height: 25px;
}
.password-img,
.verification-img {
  width: 20px;
  height: 20px;
  margin-left: 2px;
}
.show-password-img {
  width: 25px;
  height: 25px;
  margin-right: 3px;
}

.password-is-confirmed {
  filter: invert(50%) sepia(31%) saturate(1012%) hue-rotate(60deg)
    brightness(98%) contrast(87%);
}
.password-not-confirmed {
  filter: invert(14%) sepia(67%) saturate(5511%) hue-rotate(356deg)
    brightness(86%) contrast(98%);
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
  padding: 0.3em;
  color: inherit;
  flex: auto 1 1;
  width: 100%;
  background: none;
  background-color: transparent;
}

.post-it {
  font-size: 15px;
  width: 200px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
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
