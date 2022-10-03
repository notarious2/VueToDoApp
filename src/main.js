import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import TheRegistration from "./pages/TheRegistration.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fab, fas, far);

const app = createApp(App);

const routes = [
  {
    path: "/auth",
    name: "Authorization",
    component: TheRegistration,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);
app.mount("#app");
