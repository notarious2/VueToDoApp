import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import TheLogin from "./pages/TheLogin.vue";
import TheRegistration from "./pages/TheRegistration.vue";
import TheTasks from "./pages/TheTasks.vue";
import TasksTemplate from "./pages/TasksTemplate.vue";

import { createPinia } from "pinia";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fab, fas, far);

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
  },
  {
    path: "/template",
    name: "template",
    component: TasksTemplate,
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

app.use(pinia);
app.use(router);

app.mount("#app");
