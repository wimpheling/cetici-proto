<script setup lang="ts">
import { reset } from "@formkit/vue";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";
import { useApi } from "../hooks/useApi";
import { PostCommentDto } from "../openapi-client";

const content = ref("");
const { comments } = useApi();
const toast = useToast();
const props = withDefaults(
  defineProps<{
    id: string;
  }>(),
  {}
);
const emits = defineEmits(["commentCreated"]);

const submit = () =>
  comments.value
    .commentControllerCommentPost({
      commentPostQueryDto: { content: content.value },
      id: props.id,
    })
    .then((newComment) => {
      // emit the event
      emits("commentCreated", newComment);

      // reset the form
      content.value = "";
      reset("createComment");

      // display notification
      toast.add({
        severity: "success",
        summary: "Your comment was submitted",
      });
    })
    .catch((e) => {
      alert("Server error");
    });
</script>
<template>
  <h4>Add your comment</h4>
  <FormKit
    id="createComment"
    type="form"
    submit-label="Post comment"
    @submit="submit"
  >
    <FormKit
      v-model="content"
      type="textarea"
      label="Comment"
      validation="required"
    />
  </FormKit>
</template>
