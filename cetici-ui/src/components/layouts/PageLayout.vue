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

const goto = (name: string) => {
  router.push({ name });
};
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
    <div class="bottom-bar">
      <div class="inside">
        <Button icon="pi pi-wifi p-button-link" @click="goto('Home')" />
        <Button icon="pi pi-heart p-button-link" @click="goto('Liked')" />
        <Button icon="pi pi-search p-button-link" />
        <Button icon="pi pi-plus p-button-link" @click="goto('LocatePost')" />
      </div>
    </div>
  </BasePageLayout>
</template>

<style scoped>
.container {
  flex-direction: column;
  display: flex;
  margin-bottom: 5em;
}
.content {
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-self: center;
  padding: 1em;
}

.menubar {
  width: 100%;
}

.bottom-bar {
  height: 4em;
  position: fixed;
  bottom: 0;
  width: 100vw;
  padding: 1em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: white;
}
.inside {
  align-self: center;
  width: 100vw;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
