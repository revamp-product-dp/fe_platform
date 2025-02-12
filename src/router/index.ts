import { createRouter, createWebHistory } from "vue-router";
import Signin from "@/pages/signin/Signin.vue";
import Home from "@/pages/home/Home.vue";

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
    path: "/",
    name: "Home",
    component: Home,
    meta: { hasMenu: true, skipAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory("/home"),
  routes,
});

// ナビゲーションガード
router.beforeEach((to, from, next) => {
  if (to.meta.skipAuth) {
    // skipAuth が true の場合はそのまま遷移
    next();
  } else {
    // /signinに飛ばす
    router.push("/signin");
    next();
  }
});

export default router;
