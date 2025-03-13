<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
const { t } = useI18n();

const router = useRouter();
const route = useRoute();
const title = ref("");
const message = ref("");
const type = ref(route.query.type);

onBeforeMount(async () => {
  setTitleMessage();
  if (type.value === "session") {
    await sleep(2000);
    router.push("/signin/");
  }
});

const setTitleMessage = () => {
  switch (type.value) {
    case "session":
      title.value = t("error.title.session");
      message.value = t("error.message.session");
      break;
    case "token":
      title.value = t("error.title.token");
      message.value = t("error.message.token");
      break;
    default:
      title.value = t("error.title.system");
      message.value = t("error.message.system");
      break;
  }
};

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
</script>

<template>
  <q-page class="page">
    <q-card class="card">
      <H2>
        {{ title }}
      </H2>
      <p>
        {{ message }}
      </p>
    </q-card>
  </q-page>
</template>

<style scoped lang="scss">
.page {
  padding: 50px 0 0;
}

.card {
  max-width: 560px;
  padding: 20px 0 40px;
  margin: 0 auto;
}
</style>
