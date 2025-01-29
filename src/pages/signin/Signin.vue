<script setup lang="ts">
import { SigninApi } from "@/api-clients/signin";
import { ref } from "vue";

const signinApi = ref(new SigninApi());
const mailAddress = ref("");
const password = ref("");

async function signIn() {
  await signinApi.value.signIn(mailAddress.value, password.value);
}
</script>

<template>
  <p>サインイン</p>
  <form @submit.prevent="signIn">
    <input type="text" placeholder="Username" v-model="mailAddress" />
    <input type="password" placeholder="Password" v-model="password" />
    <button type="submit">Login</button>
  </form>
</template>

<style module lang="scss" scoped></style>
