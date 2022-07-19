<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs

import Toast from "primevue/toast";
import { loginToken } from "./hooks/useLoginToken";
import { useApi } from "./hooks/useApi";
import { ref } from "vue";
import ProgressSpinner from "primevue/progressspinner";

// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
const loading = ref(true);

// before loading the app, check if token is still valid
const { auth } = useApi();
if (loginToken.value) {
  auth.value
    .authControllerWhoami()
    .then(() => {
      loading.value = false;
    })
    .catch(() => {
      loginToken.value = "";
      loading.value = false;
    });
} else {
  loading.value = false;
}
</script>

<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <ProgressSpinner v-if="loading" />
  <router-view v-else></router-view>
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <Toast :breakpoints="{ '920px': { width: '100%', right: '0', left: '0' } }" />
</template>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
}
</style>
