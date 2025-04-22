<script setup lang="ts">
import router from "@/router";
import Notify from "@/helpers/notify";
import { useI18n } from "vue-i18n";
import { AccountApi } from "@/api-clients/common";
import { getCookieValueByName, deleteCookie } from "@/helpers/cookie";
import { useAccountStore } from "@/stores/useAccountStore";
import {
  Home,
  Users,
  User,
  Settings,
  LogOut,
} from "lucide-vue-next";

const accountApi = new AccountApi();
const accountStore = useAccountStore();
const { t } = useI18n();

// マスタ管理のドロップダウンメニュー項目
const masterItems = [
  {
    group: t("menu._basic_info"),
    items: [
      { name: t("menu.user_master"), path: { name: "Users" }, icon: Users },
      //{ name: t("menu.company_master"), path: { name: "Home" }, icon: Building2 },
    ],
  }
];

// 現在のルートがマスタ項目に含まれているかチェックする関数
function isMasterRoute() {
  return masterItems.some(group => 
    group.items.some(item => 
      item.path.name === router.currentRoute.value.name
    )
  );
}

async function signout() {
  const csrfToken = getCookieValueByName("csrf_access_token");
  if (csrfToken) {
    await accountApi.signOut(csrfToken);
    
    // サインアウト後にcookieを削除
    router.push({ name: "Signin" });
    deleteCookie("csrf_access_token");
    Notify.success(t("notify.signout"));
  }
}
</script>

<template>
  <q-header class="bg-white text-primary border-bottom">
    <q-toolbar class="q-px-lg">
      <!-- ロゴ部分 -->
      <q-btn flat no-caps :to="{ name: 'Home' }" class="text-primary">
        <div style="display: flex; align-items: center; justify-content: flex-start;">
          <Home class="q-mr-sm" :size="20" />
          <span style="font-size: 18px;">Home</span>
        </div>
      </q-btn>

      <!-- マスタ管理ドロップダウン -->
      <q-btn-dropdown
        flat
        no-caps
        :label="$t('header.master')"
        class="q-ml-md master-dropdown"
        :class="{ 'is-active': isMasterRoute() }"
      >
        <q-list>
          <template v-for="(group, index) in masterItems" :key="group.group">
            <q-separator v-if="index > 0" />
            <q-item-label header class="text-grey-7">
              {{ group.group }}
            </q-item-label>
            <q-item
              v-for="item in group.items"
              :key="item.name"
              :to="item.path"
              clickable
              v-close-popup
            >
              <q-item-section avatar>
                <component :is="item.icon" :size="20" />
              </q-item-section>
              <q-item-section>{{ item.name }}</q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-btn-dropdown>

      <q-space />

      <!-- ユーザーメニュー -->
      <q-btn-dropdown flat no-caps>
        <template v-slot:label>
          <q-avatar size="sm">
            <User :size="20" />
          </q-avatar>
          <span class="q-ml-sm">{{ accountStore.name }}</span>
        </template>

        <q-list class="user-dropdown">
          <div class="user-info q-pa-md">
            <div class="text-weight-bold">{{ accountStore.name }}</div>
            <div class="text-caption text-grey">{{ accountStore.mailAddress }}</div>
            <div v-if="accountStore.isAdministrator" class="text-caption text-primary q-mt-xs">{{ $t("header.admin") }}</div>
          </div>

          <q-separator />

          <q-item clickable :to="{ name: 'Home' }">
            <q-item-section avatar>
              <Settings :size="20" />
            </q-item-section>
            <q-item-section>{{ $t("header.account_settings") }}</q-item-section>
          </q-item>

          <q-item clickable @click="signout">
            <q-item-section avatar>
              <LogOut :size="20" />
            </q-item-section>
            <q-item-section>{{ $t("header.signout") }}</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </q-toolbar>
  </q-header>
</template>

<style lang="scss" scoped>
.border-bottom {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.user-dropdown {
  min-width: 220px;
}

.user-info {
  background-color: #fff;
}

.master-dropdown {
  position: relative;
  height: 50px; // ヘッダーの高さに合わせる
  
  &.is-active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 8px;
    right: 8px;
    height: 2px;
    background-color: $primary;
    border-radius: 2px;
  }

  :deep(.q-btn) {
    height: 64px;
  }
}
</style>
