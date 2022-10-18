import { createRouter, createWebHistory } from "vue-router";
import TheLogin from "./pages/TheLogin";
import TheRegistration from "./pages/TheRegistration.vue";
import TheTasks from "./pages/TheTasks.vue";

// import { useAuthStore } from "../src/components/store/userAuth.js";

// const authStore = useAuthStore();

// const ifAuthenticated = (to, from, next) => {
//   if (JSON.parse(localStorage.getItem("user")) && !authStore.errorLogIn) {
//     next();
//     return;
//   } else {
//     next("/auth");
//   }
// };

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
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
