<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import PageLayout from "../components/layouts/PageLayout.vue";
import { useApi } from "../hooks/useApi";
import { PostListingDto } from "../openapi-client";
import ProgressSpinner from "primevue/progressspinner";
import Button from "primevue/button";
import PostCard from "../components/PostCard.vue";

const { posts } = useApi();

const list = ref<PostListingDto[]>([]);
const loading = ref(true);
const fetchData = async () => {
  loading.value = true;
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      // this.gettingLocation = false;
      console.log({ pos });
      posts.value
        .postControllerList({
          postListingQueryDto: {
            location: {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            },
          },
        })
        .then((posts) => {
          loading.value = false;
          list.value = posts;
        })
        .catch((e) => {
          console.log("err", e);
          alert("Server error");
        });
    },
    (err) => {
      const retry = prompt("you must allow geolocation. Try again ?");
      if (retry) {
        fetchData();
      }
    }
  );
};
onBeforeMount(fetchData);
</script>
<template>
  <PageLayout>
    <ProgressSpinner v-if="loading" />
    <Button label="Reload" icon="pi pi-refresh" @click="fetchData" />
    <PostCard v-for="post in list" :key="post.id" :post="post" />
  </PageLayout>
</template>
