<script setup lang="ts">
import { PageApi } from "@/api-clients/common";
import { onBeforeMount, ref } from "vue";
import { useDisableStore } from "@/stores/disableStore";
import type { ActiveService } from "@/api-clients/common";

const pageApi = new PageApi();
const disableStore = useDisableStore();
const activeServiceList = ref<ActiveService[]>([]);

// サービスごとのアイコン名と遷移先のパスを定義する
const infoList = [
  {
    value: "etl-tools",
    iconName: "query_stats",
    path: "/etl-tools/signin-callback/",
  },
];

onBeforeMount(async () => {
  disableStore.setIsDisabled(true);
  await getActiveServiceList();
  disableStore.setIsDisabled(false);
});

async function getActiveServiceList() {
  activeServiceList.value = await pageApi.getActiveServiceList();
}

function getServicePath(serviceName: string) {
  return infoList.find((info) => info.value === serviceName)?.path;
}

function getIconName(serviceName: string) {
  return infoList.find((info) => info.value === serviceName)?.iconName;
}
</script>

<template>
  <q-page class="q-ml-lg">
    <H2 class="text-left q-mt-lg q-mb-md">{{ $t("home.service_list") }}</H2>
    <div :class="$style.button_grid">
      <q-btn
        v-for="service in activeServiceList"
        :key="service.value"
        :label="service.label"
        :class="$style.service_button"
        :href="getServicePath(service.value)"
        :icon="getIconName(service.value)"
        outline
        stack
        unelevated
      />
    </div>
  </q-page>
</template>

<style module lang="scss" scoped>
.button_grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 140px);
  gap: 10px;
}

.service_button {
  width: 140px;
  height: 140px;
}
</style>
