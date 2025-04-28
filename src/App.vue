<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import axios from "axios";
import Notify from "@/helpers/notify";
import { useVersionStore } from "@/stores/useVersionStore";

// メニュー・ヘッダーの有無はmeta情報で判定する
const route = useRoute();
const hasMenu = computed(() => route.meta.hasMenu ?? false);

// バージョンチェック関連の実装
const { t } = useI18n();
const versionStore = useVersionStore();
const intervalId = ref<number | null>(null);
let isDisplayedNotify = false;

// APIクラスのメソッドを直接的な関数として実装
const checkDisplayedNotify = () => {
  const notifyEl = document.querySelector<HTMLElement>(".reload-notify");
  isDisplayedNotify = notifyEl ? true : false;
};

const getTimeStamp = async () => {
  checkDisplayedNotify();
  if (isDisplayedNotify) return;
  
  try {
    const res = await axios.get("/timestamp.json");
    return res.data.timestamp;
  } catch {
    return;
  }
};

const checkVersionDiff = async () => {
  const localVersion = versionStore.version;
  checkDisplayedNotify();
  if (isDisplayedNotify) return;

  try {
    const remoteVersion = await getTimeStamp();
    if (remoteVersion && localVersion !== remoteVersion) {
      Notify.reload(
        t("notify.version_check.text"),
        t("notify.version_check.button.action"),
        t("notify.version_check.button.cancel")
      );
    }
  } catch {
    return;
  }
};

// イベントハンドラー
const handleVisibilityChange = async () => {
  if (document.visibilityState === "visible") {
    await checkVersionDiff();
    startPolling();
  } else {
    stopPolling();
  }
};

const handleStorageChange = (event: StorageEvent) => {
  if (event.key === "lastReload") {
    window.location.reload();
  }
};

const handleReloadRequest = (event: StorageEvent) => {
  if (event.key === 'reloadRequest' && event.newValue) {
    window.location.reload();
  }
};

// ポーリング制御
const startPolling = () => {
  stopPolling();
  intervalId.value = Number(setInterval(checkVersionDiff, 600000));
};

const stopPolling = () => {
  if (intervalId.value !== null) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
};

// ライフサイクルフック
onMounted(async () => {
  const timestamp = await getTimeStamp();
  if (timestamp) {
    versionStore.setVersion(timestamp);
  }
  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("storage", handleStorageChange);
  window.addEventListener("storage", handleReloadRequest);
  await checkVersionDiff();
  startPolling();
});

onUnmounted(() => {
  document.removeEventListener("visibilitychange", handleVisibilityChange);
  window.removeEventListener("storage", handleStorageChange);
  window.removeEventListener("storage", handleReloadRequest);
  stopPolling();
});
</script>

<template>
  <q-layout view="lHh Lpr lFf" class="bg-secondary">
    <template v-if="hasMenu">
      <!-- ヘッダー -->
      <Header />

      <!-- メニュー -->
      <Menu />
    </template>

    <!-- メインコンテンツ -->
    <q-page-container>
      <router-view :key="$route.fullPath" />
    </q-page-container>
  </q-layout>
</template>

<style module>
#app {
  width: 100vw;
  min-width: 100vw;
  max-width: 100vw;
  padding: 0 !important;
  margin: 0 !important;
  font-family: "Noto Sans JP", sans-serif;
}
</style>
