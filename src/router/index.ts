import { createRouter, createWebHistory } from "vue-router";
import Signin from "@/pages/signin/Signin.vue";
import Home from "@/pages/home/Home.vue";

const routes = [
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { hasMenu: true },
  },
];

const router = createRouter({
  history: createWebHistory("/home"),
  routes,
});

export default router;
