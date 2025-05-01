<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { email as validEmail } from "@/validations";

const { t } = useI18n();
const email = ref("");
const emailValid = [validEmail()];
const beforeLabelWidth = "120";
const emit = defineEmits<{
  (e: "done", emailValue: string): void;
}>();

const send = () => {
  emit("done", email.value);
};
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
        />
        <q-btn
          fill
          class="text-weight-bold q-mt-md q-mx-auto block"
          color="primary"
          type="submit"
          size="md"
          :label="t('signup.button.send')"
        />
      </q-form>
    </q-card>
    <a href="/home/signin" class="text-primary reset_pass">
      {{ t("signup.back_link") }}
    </a>
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

.reset_pass {
  max-width: 440px;
  margin: 10px auto 0;
  display: flex;
  justify-content: flex-end;
  text-decoration: underline;
}
</style>