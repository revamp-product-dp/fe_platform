import { createRouter, createWebHistory } from "vue-router";
import bindHooks from "./hooks";
import Signin from "@/pages/signin/Signin.vue";
import Signup from "@/pages/signup/Signup.vue";
import Home from "@/pages/home/Home.vue";
import Error from "@/pages/error/Error.vue";
import Users from "@/pages/users/Users.vue";
/**
 * ルートの meta 情報
 * @typedef {Object} RouteMeta
 * @property {boolean} [skipAuth] - 認証をスキップする場合 true を設定
 * @property {boolean} [hasMenu]  - メニューを表示する場合 true を設定
 */

const routes = [
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
    meta: { skipAuth: true },
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: { skipAuth: true },
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { hasMenu: true },
  },
  {
    path: "/error/",
    name: "Error",
    component: Error,
    meta: { skipAuth: true },
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: { hasMenu: true },
  },
  
];

const router = createRouter({
  history: createWebHistory("/home"),
  routes,
});

bindHooks(router);

export default router;
