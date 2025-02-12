<script setup lang="ts">
import { ref } from "vue";

const menuWidth = ref(200);
const isOpenMenu = ref(true);

const sideMenuList = ref<{ value: string; label: string }[]>([
  // { value: "test", label: "ユーザマスタ" },
  // { value: "test", label: "組織マスタ" },
]);

// TODO: API実装されてから繋ぎこむ
// async function getSideMenuList() {
//   await
// }
</script>

<template>
  <q-drawer
    v-if="sideMenuList.length > 0"
    show-if-above
    v-model="isOpenMenu"
    side="left"
    behavior="desktop"
    bordered
    class="bg-primary text-white text-left"
    :width="menuWidth"
  >
    <q-scroll-area style="height: 100%">
      <q-list>
        <q-item clickable v-for="menu in sideMenuList" :key="menu.value">
          <q-item-section class="q-px-sm">{{ menu.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
