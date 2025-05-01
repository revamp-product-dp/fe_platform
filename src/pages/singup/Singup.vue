<script setup lang="ts">
import { ref } from "vue";
import InputForm from "@/pages/singup/InputForm.vue";
import DoneMessage from "@/pages/singup/DoneMessage.vue";
const is_done = ref(false);
const email = ref("");
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