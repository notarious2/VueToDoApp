import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import TheLogin from "./pages/TheLogin.vue";
import TheRegistration from "./pages/TheRegistration.vue";
import TheTasks from "./pages/TheTasks.vue";
import PostIt from "./components/layout/PostIt.vue";

import TheHeader from "../src/components/layout/TheHeader.vue";
import TheFooter from "../src/components/layout/TheFooter.vue";

import { useAuthStore } from "../src/components/store/userAuth.js";

import { createPinia } from "pinia";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fab, fas, far);

const ifAuthenticated = (to, from, next) => {
  if (JSON.parse(localStorage.getItem("user")) && !authStore.errorLogIn) {
    next();
    return;
  } else {
    next("/auth");
  }
};

const app = createApp(App);

const pinia = createPinia();

const routes = [
  {
    path: "/auth",
    name: "Authorization",
    component: TheLogin,
  },
  {
    path: "/register",
    name: "Registration",
    component: TheRegistration,
  },

  {
    path: "/tasks",
    name: "Tasks",
    component: TheTasks,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/post",
    name: "PostIt",
    component: PostIt,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Router has to be used as a plugin in pinia
// pinia.use(({ store }) => {
//   store.router = markRaw(router);
// });

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("the-header", TheHeader);
app.component("the-footer", TheFooter);

app.use(pinia);
app.use(router);
const authStore = useAuthStore();

app.mount("#app");
