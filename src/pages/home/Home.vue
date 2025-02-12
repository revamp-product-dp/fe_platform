<script setup lang="ts">
import { PageApi } from "@/api-clients/common";
import { onBeforeMount, ref } from "vue";
import type { ActiveService } from "@/api-clients/common";

const pageApi = new PageApi();
const defaultEtlToolPath = "/signin-callback/";

const activeServiceList = ref<ActiveService[]>([]);

onBeforeMount(async () => {
  await getActiveServiceList();
});

async function getActiveServiceList() {
  activeServiceList.value = await pageApi.getActiveServiceList();
}

function getIconName(serviceName: string) {
  const iconList = [
    { value: "etl-tools", name: "query_stats" },
    { value: "logi-work", name: "local_shipping" },
  ];

  return iconList.find((icon) => icon.value === serviceName)?.name ?? "";
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
        :href="'/' + service.value + defaultEtlToolPath"
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
