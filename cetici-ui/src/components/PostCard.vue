<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import { PostCommentDto, PostListingDto } from "../openapi-client";
import * as timeago from "timeago.js";
import { useDistanceFormatter } from "../hooks/useDistance";
import CommentCard from "./CommentCard.vue";
import Card from "primevue/card";
import Button from "primevue/button";
import Avatar from "vue-boring-avatars";
import CreateComment from "./CreateComment.vue";
import { useApi } from "../hooks/useApi";

interface Props {
  post: PostListingDto;
}
const props = withDefaults(defineProps<Props>(), {});

const { likes } = useApi();
const isLiked = ref(props.post.liked);

const like = () =>
  likes.value
    .likeControllerLike({
      id: props.post.id,
    })
    .then(() => {
      isLiked.value = true;
    });

const unlike = () =>
  likes.value
    .likeControllerUnlike({
      id: props.post.id,
    })
    .then(() => {
      isLiked.value = false;
    });
const switchLike = () => (isLiked.value ? unlike() : like());
const likeIcon = computed(() =>
  isLiked.value ? "pi pi-heart-fill" : "pi pi-heart"
);

const showComments = ref(false);
const switchShowComments = () => (showComments.value = !showComments.value);

const dateTimeAgo = computed(() =>
  timeago.format(new Date(props.post.createdAt as string))
);
const formattedDistance = computed(() =>
  useDistanceFormatter(props.post.distance as number)
);

const comments = ref(props.post.comments);

const pushComment = (newComment: PostCommentDto) => {
  comments.value = [newComment, ...comments.value];
};
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
        <Button
          class="p-button-text p-button-plain"
          icon="pi pi-comment"
          :label="`${comments.length || ''}`"
          @click="switchShowComments"
        />
        <Button class="p-button-text p-button-plain" icon="pi pi-map-marker" />
        <Button
          class="p-button-text p-button-plain"
          :icon="likeIcon"
          @click="switchLike"
        />
      </div>
      <div v-if="showComments">
        <CommentCard
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
        />
        <CreateComment :id="post.id" @comment-created="pushComment" />
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
  margin-bottom: 0.5em;
  margin-top: 0.5em;
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
