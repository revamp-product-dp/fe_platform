<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { AccountApi } from '@/api-clients/openapi/api-common';
import type { Account } from '@/api-clients/openapi/api-common';

const { t } = useI18n();
const loading = ref(false);
const users = ref<Account[]>([]);
const accountApi = new AccountApi();

// ユーザー一覧を取得する関数
const fetchUsers = async () => {
  loading.value = true;
  try {
    const response = await accountApi.getAccounts();
    users.value = response;
  } catch (error) {
    console.error('Failed to fetch users:', error);
  } finally {
    loading.value = false;
  }
};

// コンポーネントがマウントされたときにユーザー一覧を取得
onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div class="q-pa-md">
    <div class="row q-mb-md">
      <div class="col-12">
        <h1 class="text-h4 q-my-none">{{ t('menu.user_master') }}</h1>
      </div>
    </div>

    <q-card>
      <q-card-section>
        <div class="row q-mb-md">
          <div class="col-12 flex justify-between items-center">
            <div class="text-h6">ユーザー一覧</div>
            <q-btn color="primary" icon="add" label="新規ユーザー" />
          </div>
        </div>

        <q-table
          :rows="users"
          :columns="[
            { name: 'id', label: 'ID', field: 'id', align: 'left' },
            { name: 'name', label: '名前', field: 'name', align: 'left' },
            { name: 'mail_address', label: 'メールアドレス', field: 'mail_address', align: 'left' },
            { name: 'authority_type', label: '権限タイプ', field: 'authority_type', align: 'left' },
            { name: 'is_administrator', label: '管理者', field: row => row.is_administrator ? '○' : '×', align: 'center' },
            { name: 'actions', label: '操作', field: 'actions', align: 'center' }
          ]"
          row-key="id"
          :loading="loading"
        >
          <template v-slot:loading>
            <q-inner-loading showing color="primary" />
          </template>
          
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn flat round color="primary" icon="edit" size="sm" />
              <q-btn flat round color="negative" icon="delete" size="sm" />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </div>
</template>

<style lang="scss" scoped>
.q-table {
  border-radius: 4px;
}
</style>
