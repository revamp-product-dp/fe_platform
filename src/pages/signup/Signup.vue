<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { OrganizationApi } from "@/api-clients/common";
import InputForm from "@/pages/signup/InputForm.vue";
import DoneMessage from "@/pages/signup/DoneMessage.vue";

const organizationApi = new OrganizationApi();
const router = useRouter();
const is_done = ref(false);
const email = ref("");
const signinPagePath = "/signin";

onBeforeMount(async () => {
  await checkContractService();
});

// 対象サービスを契約していない場合、サインイン画面に戻す
async function checkContractService() {
  const res = await organizationApi.getOrganizationContractServiceList();
  const data = res.service_unit_list || []
  if (!data.includes("TRANSLATE"))
    router.push(signinPagePath);
}

const done = (emailValue: string) => {
  is_done.value = true;
  email.value = emailValue;
}
</script>

<template>
  <template v-if="is_done">
    <DoneMessage :email="email" />
  </template>
  <template v-else>
    <InputForm @done="done" />
  </template>
</template>

<style scoped lang="scss"></style>