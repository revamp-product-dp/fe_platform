import { createRouter, createWebHistory } from "vue-router";
import Signin from "@/pages/signin/Signin.vue";
import Signup from "@/pages/singup/SingUp.vue";
import Home from "@/pages/home/Home.vue";
import Error from "@/pages/error/Error.vue";
import Users from "@/pages/users/Users.vue";
import { useAccountStore } from "@/stores/useAccountStore";
import { AccountApi } from "@/api-clients/common";
import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
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

// 認証チェック
const checkAuthentication = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (to.meta.skipAuth) {
    next();
    return;
  }

  const api = new AccountApi();
  try {
    const data = await api.getAccount();
    // アカウント情報をストアに保存
    const account = useAccountStore();
    account.set(data);
    next();
  } catch (e) {
    // セッションエラー時の処理
    const currentPath = window.location.pathname;
    const expiresDate = new Date();
    expiresDate.setTime(expiresDate.getTime() + 3 * 60 * 1000);
    document.cookie = `previousPath=${currentPath}; expires=${expiresDate.toUTCString()}; path=/`;

    next({ name: "Signin" });
  }
};

// ナビゲーションガード
router.beforeEach(checkAuthentication);

export default router;
