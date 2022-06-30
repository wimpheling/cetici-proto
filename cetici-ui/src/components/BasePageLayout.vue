<script setup lang="ts">
const props = defineProps({
  title: { type: String, required: true },
});
</script>

<template>
  <h2>{{ props.title }}</h2>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style>
.container {
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
}
</style>
