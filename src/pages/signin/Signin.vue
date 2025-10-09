<script setup lang="ts">
import { AccountApi } from "@/api-clients/common";
import { OrganizationApi } from "@/api-clients/common";
import { ref, onMounted } from "vue";
import { required, email } from "@/validations/index";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useAccountStore } from "@/stores/useAccountStore";
import { useDisableStore } from "@/stores/disableStore";
import Notify from "@/helpers/notify";

const { t } = useI18n();
const accountApi = new AccountApi();
const organizationApi = new OrganizationApi();
const router = useRouter();
const accountStore = useAccountStore();
const disableStore = useDisableStore();
const validRequired = [required()];
const validMailAddress = [required(), email()];
const beforeLabelWidth = "82";
const resetPassPagePath = "/etl-tools/password-reset";
const signupPagePath = "/signup";

const showSignupLink = ref(false);
const mailAddress = ref("");
const password = ref("");

onMounted(() => {
  checkContractService();
});

async function signIn() {
  try {
    disableStore.setIsDisabled(true);
    const res = await accountApi.signIn(mailAddress.value, password.value);
    // @ts-ignore TODO: 型不整合の修正（そもそもいらないかも？）
    accountStore.set(res);
    router.push("/");
  } catch (error: unknown) {
    // エラーハンドリング
    let errorMessage = "";
    if (error.response?.status === 401) {
      // 401エラーはログイン失敗（残り試行回数警告含む）
      const errorMsg = error.response?.data?.detail || error.response?.data?.msg || error.message || "";
      
      // バックエンドからのメッセージに基づいてフロントエンドで多言語対応
      if (errorMsg.includes("attempts remaining")) {
        // 残り試行回数警告メッセージ
        const remainingAttempts = errorMsg.match(/(\d+)\s+attempts remaining/)?.[1] || "5";
        errorMessage = t("notify.attempts_remaining_message", { count: remainingAttempts });
      } else if (errorMsg.includes("Invalid password")) {
        // 通常のログイン失敗メッセージ
        errorMessage = t("notify.auth_error");
      } else {
        // フォールバック
        errorMessage = errorMsg || t("notify.auth_error");
      }
    } else if (error.response?.status === 403) {
      // 403エラー時はアカウントロックと判定してパスワードリセット画面へ遷移
      // エラーメッセージはパスワードリセット案内を含む
      errorMessage = t("notify.account_locked_error");
    } else if (error.response?.status >= 500) {
      // サーバーエラーの場合
      errorMessage = t("notify.server_error");
    } else {
      // その他のエラー
      errorMessage = t("notify.general_error");
    }
    // エラー通知を表示
    Notify.negative(`${errorMessage}`);
  } finally {
    disableStore.setIsDisabled(false);
  }
}

async function checkContractService() {
  const res = await organizationApi.getOrganizationContractServiceList();
  const data = res.service_unit_list || []
  showSignupLink.value = data.includes("TRANSLATE");
}

function navigateToSignup() {
  router.push(signupPagePath);
}
</script>

<template>
  <q-page class="q-pl-md page">
    <q-card class="q-pa-lg card">
      <Title class="q-mb-lg text-center">{{ $t("signin.signin") }}</Title>
      <q-form @submit="signIn">
        <Input
          v-model="mailAddress"
          required
          class="input"
          :before-label="$t('signin.id')"
          :beforeLabelWidth="beforeLabelWidth"
          :rules="validMailAddress"
          :disabled="disableStore.isDisabled"
        />
        <Input
          v-model="password"
          type="password"
          required
          class="input"
          :before-label="$t('signin.password')"
          :beforeLabelWidth="beforeLabelWidth"
          :rules="validRequired"
          :disabled="disableStore.isDisabled"
        />
        <q-btn
          fill
          class="text-weight-bold q-mt-md q-mx-auto block"
          color="primary"
          type="submit"
          size="md"
          :label="$t('signin.signin')"
          :disabled="disableStore.isDisabled"
        />
      </q-form>
    </q-card>
    <div class="links-container">
      <a :href="resetPassPagePath" class="text-primary link">{{
        $t("signin.forgot_password")
      }}</a>
      <a v-if="showSignupLink" href="#" @click.prevent="navigateToSignup" class="text-primary link">{{
        $t("signin.signup")
      }}</a>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.page {
  width: 100%;
  padding: 50px 0 0;
}

.card {
  max-width: 440px;
  padding: 30px;
  margin: 0 auto;
}

.input {
  :deep(.q-field__control) {
    padding: 0;
  }
  :deep(.q-field__control-container) {
    padding: 0 1px;
  }
  :deep(.q-field__native) {
    padding: 0px 5px 0px 11px;
    border-radius: 3px;
  }
  :deep(.q-field__append) {
    padding: 6px !important;
  }
}

.links-container {
  max-width: 440px;
  margin: 10px auto 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.link {
  text-decoration: underline;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
