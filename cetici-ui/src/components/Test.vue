<script setup lang="ts">
import { ref } from "vue";
import {
  AuthControllerApi,
  Configuration,
  DefaultConfig,
} from "../openapi-client";
const email = ref(""),
  name = ref(""),
  password = ref("");
const cli = new AuthControllerApi(
  new Configuration({
    ...DefaultConfig,
    basePath: "http://localhost:8083",
  })
);

function register() {
  cli.authControllerRegister({
    registerUserDto: {
      email: email.value,
      name: name.value,
      password: password.value,
    },
  });
}
</script>

<template>
  <div class="container">
    <div class="line">Email <input v-model="email" /></div>
    <div class="line">Name <input v-model="name" /></div>
    <div class="line">password <input v-model="password" /></div>
  </div>
  <button @click="register">Register</button>
</template>

<style>
.container {
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
}
.line {
  margin: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
