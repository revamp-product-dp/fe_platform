<script setup lang="ts">
import { ref } from "vue";

const activeServiceList = ref([
  { value: "etl-tools", label: "ETL" },
  { value: "logi-wook", label: "工数管理" },
  { value: "etl-tools", label: "サンプル" },
  { value: "etl-tools", label: "サンプル" },
  { value: "etl-tools", label: "サンプル" },
  { value: "etl-tools", label: "サンプル" },
  { value: "etl-tools", label: "サンプル" },
  { value: "etl-tools", label: "サンプル" },
  { value: "etl-tools", label: "サンプル" },
  { value: "etl-tools", label: "サンプル" },
  { value: "etl-tools", label: "サンプル" },
  { value: "etl-tools", label: "サンプル" },
  { value: "etl-tools", label: "サンプル" },
  { value: "etl-tools", label: "サンプル" },
]);
</script>

<template>
  <q-page class="q-ml-lg">
    <H2 class="text-left q-mt-lg q-mb-md">サービス一覧</H2>
    <div :class="$style.button_grid">
      <q-btn
        v-for="service in activeServiceList"
        :key="service.value"
        :label="service.label"
        :class="$style.service_button"
        href="/"
        icon="home"
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
