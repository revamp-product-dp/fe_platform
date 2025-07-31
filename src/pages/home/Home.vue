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

// お知らせのダミーデータ
// お知らせのデータ
const informations = ref([
  {
    id: 3,
    title: "【重要】システムアップデートのお知らせ",
    timestamp: "20230915000000",
    is_read: false,
    category: "system",
  },
  {
    id: 2,
    title: "定期メンテナンスのお知らせ（2023年9月10日実施）",
    timestamp: "20230905000000",
    is_read: true,
    category: "maintenance",
  },
  {
    id: 1,
    title: "新機能リリースのお知らせ",
    timestamp: "20230825000000",
    is_read: true,
    category: "info",
  },
]);

// 表示件数を制限
const displayCount = 3;

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

// 日付フォーマット関数
function formatDate(timestamp: string) {
  return `${timestamp.slice(0,4)}/${timestamp.slice(4,6)}/${timestamp.slice(6,8)}`;
}
</script>

<template>
  <q-page class="q-pa-md" style="padding-left: 40px;">

    <!-- 既存のサービスリスト -->
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
        <q-tooltip>{{ service.label }}{{ $t("home.open") }}</q-tooltip>
      </q-btn>
    </div>
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
        <q-tooltip>{{ service.label }}{{ $t("home.open") }}</q-tooltip>
      </q-btn>
    </div>
        <!-- お知らせセクション -->
        <div class="information-section q-mb-xl">
      <div class="section-header q-mb-md">
        <Title style="padding-left: 0px;">お知らせ</Title>
        <q-btn flat color="primary" label="もっと見る" icon-right="arrow_forward" class="view-more-btn" />
      </div>
      <q-list bordered separator class="bg-white information-list">
        <q-item v-for="info in informations.slice(0, displayCount)" 
                :key="info.id" 
                clickable
                v-ripple
                class="information-item">
          <q-item-section avatar>
            <q-icon :name="info.category === 'system' ? 'priority_high' : info.category === 'maintenance' ? 'build' : 'info'" 
                    :color="info.category === 'system' ? 'red' : info.category === 'maintenance' ? 'orange' : 'blue'" 
                    size="sm" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="information-title">{{ info.title }}</q-item-label>
            <q-item-label caption class="information-date">{{ formatDate(info.timestamp) }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="chevron_right" color="grey-6" size="xs" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
  
</template>

<style lang="scss" scoped>
.button_grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  gap: 16px;
  margin: 0;
  width: 100%;
  
  @media (max-width: 599px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
}

.service_button {
  width: 200px;
  min-height: 150px;
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
    max-width: 200px;
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

.information-section {
  margin-top: 40px;
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .view-more-btn {
    font-weight: 500;
    border-radius: 20px;
    padding: 0 16px;
    transition: background-color 0.3s;
    
    &:hover {
      background-color: rgba(26, 42, 123, 0.08);
    }
  }
  
  .information-list {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  }

  .information-item {
    padding: 16px;
    transition: all 0.3s ease;

    &:hover {
      background-color: rgba(0, 0, 0, 0.03);
      transform: translateX(4px);
    }
    
    .information-title {
      font-weight: 500;
      line-height: 1.4;
    }
    
    .information-date {
      margin-top: 4px;
      color: rgba(0, 0, 0, 0.6);
    }
    
    .notification-badge {
      border-radius: 50%;
      height: 10px;
      width: 10px;
      margin-right: 8px;
    }
  }
}
</style>
