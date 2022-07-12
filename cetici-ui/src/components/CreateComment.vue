<script setup lang="ts">
import { ref } from "vue";
import { useApi } from "../hooks/useApi";

const content = ref("");
const { comments } = useApi();
const props = withDefaults(defineProps<{ id: string }>(), { id: "" });

const submit = () =>
  comments.value
    .commentControllerCommentPost({
      commentPostQueryDto: { content: content.value },
      id: props.id,
    })
    .then(() => {
      alert("success");
    })
    .catch(() => {
      alert("Server error");
    });
</script>
<template>
  <h4>Add your comment</h4>
  <FormKit type="form" submit-label="Post comment" @submit="submit">
    <FormKit
      v-model="content"
      type="textarea"
      label="Comment"
      validation="required"
    />
  </FormKit>
</template>
