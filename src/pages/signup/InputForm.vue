<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { required, email as validEmail } from "@/validations";
import { useDisableStore } from "@/stores/disableStore";
import { useRouter } from "vue-router";
import { UserApi } from "@/api-clients/common";
import type { UsersPreRegistrationPostRequest } from "@/api-clients/common";

const { t } = useI18n();
const router = useRouter();
const email = ref("");
const emailValid = [required(), validEmail()];
const beforeLabelWidth = "120";
const disableStore = useDisableStore();
const signinPagePath = "/signin";
const passwordSettingPagePath = "/etl-tools/password-setting";

const emit = defineEmits<{
  (e: "done", emailValue: string): void;
}>();

const send = async () => {
  disableStore.setIsDisabled(true);
  const url = window.location.origin + passwordSettingPagePath;
  await sendMail(email.value, url);
  emit("done", email.value);
  disableStore.setIsDisabled(false);
};

const sendMail = async (email: string, url: string): Promise<void> => {
  const sleep = (msec: number) => new Promise((resolve) => setTimeout(resolve, msec));
  await sleep(1500);

  const api = new UserApi();
  const param: UsersPreRegistrationPostRequest = {
    email: email,
    callback_url: url,
  };
  await api.sendPreRegistrationMail(param);
};

function navigateToSignin() {
  router.push(signinPagePath);
}
</script>

<template>
  <q-page class="q-pl-md page">
    <q-card class="q-pa-lg card">
      <Title class="q-mb-lg text-center">{{ t("signup.title") }}</Title>
      <p class="text-center description">{{ t("signup.text") }}</p>
      <q-form @submit="send">
        <Input
          v-model="email"
          required
          class="input"
          :before-label="t('signup.email')"
          :beforeLabelWidth="beforeLabelWidth"
          :rules="emailValid"
          :disable="disableStore.isDisabled"
          autofocus
        />
        <q-btn
          fill
          class="text-weight-bold q-mt-md q-mx-auto block"
          color="primary"
          type="submit"
          size="md"
          :label="t('signup.button.send')"
          :disable="disableStore.isDisabled"
        />
      </q-form>
    </q-card>
    <a href="#" @click.prevent="navigateToSignin" class="text-primary link">{{
      $t("signup.back_link")
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

.description {
  color: #666;
  margin-bottom: 2rem;
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

.link {
  max-width: 440px;
  margin: 10px auto 0;
  display: flex;
  justify-content: flex-end;
  text-decoration: underline;
}
</style>