import { useAccountStore } from "@/stores/useAccountStore";
import { SettingLocale } from "@/plugins/i18n";
import { AccountApi } from "@/api-clients/common";
import type { Router, RouteLocationNormalized, NavigationGuardNext } from "vue-router";

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
    // 表示する言語をユーザ設定の言語に変更する
    const locale = new SettingLocale();
    if (data.lang_cd) {
      locale.changeLocale(data.lang_cd as "ja" | "en" | "zh");
    } else {
      locale.changeLocale("ja");
    }
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

export default async (router: Router): Promise<void> => {
  router.beforeEach(checkAuthentication);
};
