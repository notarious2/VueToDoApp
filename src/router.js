import { createRouter, createWebHistory } from "vue-router";
import TheLogin from "./pages/TheLogin";
import TheRegistration from "./pages/TheRegistration.vue";
import TheHome from "./pages/TheHome.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: TheHome,
  },
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
