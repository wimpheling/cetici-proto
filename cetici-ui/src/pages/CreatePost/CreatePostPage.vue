<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { useApi } from "../../hooks/useApi";
import { NominatimLocation, PostDto } from "../../openapi-client";
import PageLayout from "../../components/layouts/PageLayout.vue";
import { useToast } from "primevue/usetoast";
import { useRoute, useRouter } from "vue-router";
import ProgressSpinner from "primevue/progressspinner";

const { posts, geocoding } = useApi();
const toast = useToast();
const router = useRouter();
const route = useRoute();

const nominatimLocationId = ref<number>();
const nominatimLocation = ref<NominatimLocation>();
const loading = ref(true);

const postDto = reactive<PostDto>({
  content: "",
  nominatimLocationId: nominatimLocationId.value,
});

async function createPost() {
  await posts.value.postControllerCreate({ postDto });
  toast.add({ severity: "success", summary: "Post successfully created" });
  router.push({ name: "Home" });
}

async function load(newId: string) {
  nominatimLocationId.value = parseInt(newId as string);
  postDto.nominatimLocationId = nominatimLocationId.value;
  geocoding.value
    .geocodingControllerGet({
      placeId: nominatimLocationId.value,
    })
    .then((value) => {
      nominatimLocation.value = value;
      loading.value = false;
    });
}

load(route.params.locationId as string);
</script>

<template>
  <PageLayout title="Create post">
    <ProgressSpinner v-if="loading" />
    <div v-else-if="nominatimLocation" class="pb-3">
      <b>Location :</b>
      <br />
      {{ nominatimLocation.displayName }}
    </div>
    <FormKit
      v-if="!loading"
      v-model="postDto"
      type="form"
      submit-label="Create post"
      @submit="createPost"
    >
      <FormKit
        v-model="postDto.content"
        label="Content"
        type="textarea"
        validation="required"
      />
    </FormKit>
  </PageLayout>
</template>
