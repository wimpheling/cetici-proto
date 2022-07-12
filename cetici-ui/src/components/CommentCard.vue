<script setup lang="ts">
import { computed } from "vue";
import { PostCommentDto } from "../openapi-client";
import * as timeago from "timeago.js";

interface Props {
  comment: PostCommentDto;
}
const props = withDefaults(defineProps<Props>(), {});

const dateTimeAgo = computed(() =>
  timeago.format(new Date(props.comment.createdAt as string))
);
</script>
<template>
  <div class="pt-2 pb-2">
    <div>{{ props.comment.content }}</div>
    <div class="text-xs">
      {{ props.comment.author.name }} - {{ dateTimeAgo }}
    </div>
  </div>
</template>
