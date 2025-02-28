<script setup lang="ts">
import router from "@/router";
import Notify from "@/helpers/notify";
import { useI18n } from "vue-i18n";
import { AccountApi } from "@/api-clients/common";
import { getCookieValueByName } from "@/helpers/cookie";
import { useUserStore } from "@/stores/userStore";

const accountApi = new AccountApi();
const userStore = useUserStore();
const { t } = useI18n();

async function signout() {
  const csrfToken = getCookieValueByName("csrf_access_token");
  if (csrfToken) {
    await accountApi.signOut(csrfToken);
    router.push("/signin/");
    Notify.success(t("notify.signout"));
  }
}
</script>

<template>
  <q-header
    class="row justify-end text-primary"
    style="background: transparent"
  >
    <q-toolbar class="q-px-lg">
      <q-toolbar-title class="text-left text-weight-bold">
        Platform
      </q-toolbar-title>

      <q-btn color="primary" flat round dense icon="person" size="lg" />
      <span>{{ userStore.userInfo.name }}</span>
      <a class="signout" @click="signout">{{ $t("home.signout") }}</a>
    </q-toolbar>
  </q-header>
</template>

<style lang="scss" scoped>
.signout {
  cursor: pointer;
  margin-left: 20px;
}
</style>
