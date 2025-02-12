<script setup lang="ts">
import { AccountApi } from "@/api-clients/common";
import { ref } from "vue";
import { required, email } from "@/validations/index";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const accountApi = new AccountApi();
const router = useRouter();
const userStore = useUserStore();
const validRequired = [required()];
const validMailAddress = [required(), email()];
const beforeLabelWidth = "80";
const resetPassPagePath = "/etl-tools/reset-password";

const mailAddress = ref("");
const password = ref("");

async function signIn() {
  const res = await accountApi.signIn(mailAddress.value, password.value);
  userStore.setUserInfo(res);
  router.push("/");
}
</script>

<template>
  <q-page class="q-pl-md" :class="$style.page">
    <q-card class="q-pa-lg" :class="$style.card">
      <H2 class="q-mb-lg">{{ $t("signin.signin") }}</H2>
      <q-form @submit="signIn">
        <Input
          v-model="mailAddress"
          required
          :before-label="$t('signin.id')"
          :beforeLabelWidth="beforeLabelWidth"
          :rules="validMailAddress"
        />
        <Input
          v-model="password"
          type="password"
          required
          :before-label="$t('signin.password')"
          :beforeLabelWidth="beforeLabelWidth"
          :rules="validRequired"
        />
        <q-btn
          fill
          class="text-weight-bold q-mt-md"
          color="primary"
          type="submit"
          size="md"
          :label="$t('signin.signin')"
        />
      </q-form>
    </q-card>
    <a
      :href="resetPassPagePath"
      class="text-primary"
      :class="$style.reset_pass"
      >{{ $t("signin.forgot_password") }}</a
    >
  </q-page>
</template>

<style module lang="scss" scoped>
.page {
  width: 100%;
  padding: 50px 0 0;
}
.card {
  max-width: 440px;
  margin: 0 auto;
}
.reset_pass {
  max-width: 440px;
  margin: 10px auto 0;
  display: flex;
  justify-content: flex-end;
  text-decoration: underline;
}
</style>
