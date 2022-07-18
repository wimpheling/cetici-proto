<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs

import Toast from "primevue/toast";
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>

<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <router-view></router-view>
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
