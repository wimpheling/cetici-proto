<script setup lang="ts">
import { useRouter } from "vue-router";
import Menubar from "primevue/menubar";
import Button from "primevue/button";
import { loginToken } from "../hooks/useLoginToken";
import BasePageLayout from "./BasePageLayout.vue";

const props = defineProps({
  title: { type: String, required: true },
});
const router = useRouter();
function logout() {
  loginToken.value = undefined;
  router.push({ name: "Login" });
}
</script>

<template>
  <Menubar>
    <template #start>
      <h3>Cetici</h3>
    </template>
    <template #end>
      <Button
        label="Logout"
        class="p-button-text p-button-plain"
        @click="logout"
      />
    </template>
  </Menubar>
  <BasePageLayout :title="props.title"> <slot></slot></BasePageLayout>
</template>

<style>
.container {
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
}
</style>
