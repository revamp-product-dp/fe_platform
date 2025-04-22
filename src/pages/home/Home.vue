<script setup lang="ts">
import { PageApi } from "@/api-clients/common";
import { onBeforeMount, ref } from "vue";
import { useDisableStore } from "@/stores/disableStore";
import type { ActiveService } from "@/api-clients/common";

const pageApi = new PageApi();
const disableStore = useDisableStore();
const activeServiceList = ref<ActiveService[]>([]);

// サービスごとのアイコン名と遷移先のパスを定義する
const serviceInfoList = [
  {
    value: "etl-tools",
    iconName: "query_stats",
    path: "/etl-tools/signin-callback/",
  },
  {
    value: "logiwork",
    iconName: "pending_actions",
    path: "/logiwork/",
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
  return serviceInfoList.find((info) => info.value === serviceName)?.path;
}

function getIconName(serviceName: string) {
  return serviceInfoList.find((info) => info.value === serviceName)?.iconName;
}
</script>

<template>
  <q-page class="q-pa-md" style="padding-left: 40px;">
    <Title class="q-mb-md" style="padding-left: 0px;">{{ $t("home.service_list") }}</Title>
    <div class="button_grid">
      <q-btn
        v-for="service in activeServiceList"
        :key="service.value"
        :label="service.label"
        :href="getServicePath(service.value)"
        :icon="getIconName(service.value)"
        class="service_button"
        flat
        stack
        unelevated
      >
        <div class="service_description">{{ service.description }}</div>
        <q-tooltip>{{ service.label }}{{ $t("home.open") }}</q-tooltip>
      </q-btn>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.button_grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  gap: 16px;
  margin: 0;
  width: 100%;
  
  @media (max-width: 599px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
}

.service_button {
  width: 250px;
  min-height: 200px;
  height: auto;
  border-radius: 16px;
  transition: all 0.3s ease;
  background: #ffffff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  border: 2px solid rgba(26, 42, 123, 0.05);
  position: relative;
  overflow: hidden;
  
  @media (max-width: 599px) {
    width: 100%;
    max-width: 250px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 7px;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }

  :deep(.q-icon) {
    font-size: clamp(2rem, 4vw, 2.5rem);
    margin-bottom: 4px;
    color: #1a2a7b;
    background: rgba(26, 42, 123, 0.1);
    padding: 12px;
    border-radius: 50%;
  }

  :deep(.q-btn__content) {
    flex-direction: column;
    gap: 8px;
  }

  :deep(.q-btn__label) {
    font-size: clamp(1rem, 3vw, 1.1rem);
    font-weight: 500;
    color: rgba(0, 0, 0, 0.87);
  }

  .service_description {
    font-size: clamp(0.85rem, 2.5vw, 0.9rem);
    color: rgba(0, 0, 0, 0.6);
    margin-top: 4px;
  }
}
</style>
