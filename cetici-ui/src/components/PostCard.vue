<script setup lang="ts">
import { computed } from "vue";
import { PostListingDto } from "../openapi-client";
import * as timeago from "timeago.js";
import { useDistanceFormatter } from "../hooks/useDistance";
import Card from "primevue/card";
import Button from "primevue/button";
import Avatar from "vue-boring-avatars";

interface Props {
  post: PostListingDto;
}
const props = withDefaults(defineProps<Props>(), {});
const dateTimeAgo = computed(() =>
  timeago.format(new Date(props.post.createdAt as string))
);
const formattedDistance = computed(() =>
  useDistanceFormatter(props.post.distance as number)
);
</script>

<template>
  <Card class="mycard">
    <template #content>
      <div class="vertical">
        <div class="horizontal">
          <div class="pr-1">
            <Avatar :size="40" variant="bauhaus" :name="post.author?.id" />
          </div>
          <div class="vertical">
            <div>
              {{ post.author?.name }}
            </div>
            <div>
              {{ dateTimeAgo }} -
              {{ formattedDistance }}
            </div>
            <div>
              <div class="ellipsis">
                {{ post.location.displayName }}
              </div>
            </div>
          </div>
        </div>
        <div class="content">
          {{ post.content }}
        </div>
      </div>
    </template>
    <template #footer>
      <div class="button-container">
        <Button class="p-button-text p-button-plain" icon="pi pi-comment" />
        <Button class="p-button-text p-button-plain" icon="pi pi-map-marker" />
        <Button class="p-button-text p-button-plain" icon="pi pi-heart" />
      </div>
    </template>
  </Card>
</template>

<style scoped>
.vertical {
  display: flex;
  flex-direction: column;
}
.horizontal {
  display: flex;
  flex-direction: row;
}
.mycard {
  display: flex;
  align-self: stretch;
}
.mycard > .p-card-body {
  width: 100%;
}
.mycard > .p-card-body > .p-card-content,
.mycard > .p-card-body > .p-card-footer {
  align-self: stretch;
  display: flex;
}
.content {
  padding: 1rem;
}

.button-container {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
}

.ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  min-width: 0;
}
</style>
