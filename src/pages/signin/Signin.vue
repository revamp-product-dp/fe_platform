<script setup lang="ts">
import { AccountApi } from "@/api-clients/common";
import { ref } from "vue";
import { required, email } from "@/validations/index";
import { useRouter } from "vue-router";
import { useAccountStore } from "@/stores/useAccountStore";
import { useDisableStore } from "@/stores/disableStore";

const accountApi = new AccountApi();
const router = useRouter();
const accountStore = useAccountStore();
const disableStore = useDisableStore();
const validRequired = [required()];
const validMailAddress = [required(), email()];
const beforeLabelWidth = "82";
const resetPassPagePath = "/etl-tools/password-reset";

const mailAddress = ref("");
const password = ref("");

async function signIn() {
  disableStore.setIsDisabled(true);
  const res = await accountApi.signIn(mailAddress.value, password.value);
  disableStore.setIsDisabled(false);
  // @ts-ignore TODO: 型不整合の修正（そもそもいらないかも？）
  accountStore.set(res);
  router.push("/");
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
    <a :href="resetPassPagePath" class="text-primary reset_pass">{{
      $t("signin.forgot_password")
    }}</a>
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

.reset_pass {
  max-width: 440px;
  margin: 10px auto 0;
  display: flex;
  justify-content: flex-end;
  text-decoration: underline;
}
</style>
