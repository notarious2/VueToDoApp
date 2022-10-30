import { createRouter, createWebHistory } from "vue-router";
import TheLogin from "./pages/TheLogin";
import TheRegistration from "./pages/TheRegistration.vue";
import TheHome from "./pages/TheHome.vue";

const routes = [
  {
    path: "VueToDoApp/",
    name: "Home",
    component: TheHome,
  },
  {
    path: "VueToDoApp/login",
    name: "Authorization",
    component: TheLogin,
  },
  {
    path: "VueToDoApp/register",
    name: "Registration",
    component: TheRegistration,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
