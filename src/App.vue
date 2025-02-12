<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

// メニュー・ヘッダーの有無はmeta情報で判定する
const route = useRoute();
const hasMenu = computed(() => route.meta.hasMenu ?? false);
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
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style>
#app {
  width: 100vw;
  min-width: 100vw;
  max-width: 100vw;
  padding: 0 !important;
  margin: 0 !important;
}
</style>
