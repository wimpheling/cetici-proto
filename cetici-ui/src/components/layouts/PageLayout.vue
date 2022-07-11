<script setup lang="ts">
import { useRouter } from "vue-router";
import Menubar from "primevue/menubar";
import Button from "primevue/button";
import { loginToken } from "../../hooks/useLoginToken";
import BasePageLayout from "./BasePageLayout.vue";
import { MenuItem } from "primevue/menuitem";

const props = defineProps({
  title: { type: String, required: false, default: undefined },
});

const items: MenuItem[] = [
  {
    label: "Cetici",
    icon: "pi pi-home",
    to: "/",
  },
  {
    label: "New post",
    icon: "pi pi-plus",
    to: "/locate",
  },
];

const router = useRouter();
function logout() {
  loginToken.value = undefined;
  router.push({ name: "Login" });
}
</script>

<template>
  <BasePageLayout>
    <div class="container">
      <Menubar :model="items" class="menubar">
        <template #end>
          <Button
            label="Logout"
            class="p-button-text p-button-plain"
            @click="logout"
          />
        </template>
      </Menubar>
      <div class="content">
        <h1 v-if="props.title">{{ props.title }}</h1>
        <slot></slot>
      </div>
    </div>
  </BasePageLayout>
</template>

<style>
.container {
  flex-direction: column;
  display: flex;
}
.content {
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-self: center;
}

.menubar {
  width: 100%;
}
</style>
