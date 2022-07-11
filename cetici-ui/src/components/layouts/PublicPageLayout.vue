<script setup lang="ts">
import BasePageLayout from "./BasePageLayout.vue";
const props = defineProps({
  title: { type: String, required: true },
});
</script>

<template>
  <BasePageLayout>
    <div class="container">
      <h2>Cetici</h2>
      <h3 v-if="props.title">{{ props.title }}</h3>
      <slot></slot>
    </div>
  </BasePageLayout>
</template>

<style>
.container {
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
}
</style>
