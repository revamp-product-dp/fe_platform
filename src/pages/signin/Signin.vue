<script setup lang="ts">
import { AccountApi } from "@/api-clients/common";
import { ref } from "vue";
import { required, email } from "@/validations/index";
import { useRouter } from "vue-router";

const accountApi = new AccountApi();
const router = useRouter();
const validRequired = [required()];
const validMailAddress = [required(), email()];
const beforeLabelWidth = "80";

const mailAddress = ref("");
const password = ref("");

async function signIn() {
  await accountApi.signIn(mailAddress.value, password.value);
  router.push("/");
}
</script>

<template>
  <q-page class="q-pl-md" :class="$style.page">
    <q-card class="q-pa-lg" :class="$style.card">
      <H2 class="q-mb-lg">{{ $t("signin") }}</H2>
      <q-form @submit="signIn">
        <Input
          v-model="mailAddress"
          required
          :before-label="$t('id')"
          :beforeLabelWidth="beforeLabelWidth"
          :rules="validMailAddress"
        />
        <Input
          v-model="password"
          required
          :before-label="$t('password')"
          :beforeLabelWidth="beforeLabelWidth"
          :rules="validRequired"
        />
        <q-btn
          fill
          class="text-weight-bold q-mt-md"
          color="primary"
          type="submit"
          size="md"
          :label="$t('signin')"
        />
      </q-form>
    </q-card>
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
</style>
