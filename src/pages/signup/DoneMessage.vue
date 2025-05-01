<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();
const signinPagePath = "/signin";

defineProps<{
  email: string;
}>();

function navigateToSignin() {
  router.push(signinPagePath);
}
</script>

<template>
  <q-page class="q-pl-md page">
    <q-card class="q-pa-lg card">
      <div class="success-icon q-mb-md">
        <q-icon name="check_circle" color="positive" size="64px" />
      </div>
      
      <Title class="q-mb-lg text-center">{{ t("signup.done.title") }}</Title>
      
      <div class="message-container">
        <p class="email-text">
          <span class="email">{{ email }}</span>
          {{ t("signup.done.text_1") }}
        </p>
        
        <div class="instruction-text">
          <p>{{ t("signup.done.text_2") }}</p>
          <p>{{ t("signup.done.text_3") }}</p>
          <p>{{ t("signup.done.text_4") }}</p>
        </div>
      </div>
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
  max-width: 550px;
  padding: 30px;
  margin: 0 auto;
}

.success-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.message-container {
  text-align: center;
  color: #2c3e50;
}

.email-text {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.email {
  font-weight: bold;
  color: #1976d2;
}

.instruction-text {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1rem 0;
  text-align: left;

  p {
    margin: 0.5rem 0;
    line-height: 1.6;
    
    &:first-child {
      margin-top: 0;
    }
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.link {
  max-width: 550px;
  margin: 10px auto 0;
  display: flex;
  justify-content: flex-end;
  text-decoration: underline;
}
</style>