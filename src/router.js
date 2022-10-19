import { createRouter, createWebHistory } from "vue-router";
import TheLogin from "./pages/TheLogin";
import TheRegistration from "./pages/TheRegistration.vue";
import TheTasks from "./pages/TheTasks.vue";

import { useAuthStore } from "../src/components/store/userAuth.js";

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
    // beforeEnter: ifAuthenticated,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.user && !authStore.isAuthenticated) {
    next("/auth");
  } else {
    next();
  }
});

export default router;
