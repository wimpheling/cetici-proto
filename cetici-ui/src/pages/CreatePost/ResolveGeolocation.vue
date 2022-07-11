<script setup lang="ts">
import { reactive, ref } from "vue";
import { useApi } from "../../hooks/useApi";
import {
  ReverseGeocodingQueryDto,
  ReverseGeocodingResultDto,
} from "../../openapi-client";
import PageLayout from "../../components/layouts/PageLayout.vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import Button from "primevue/button";
import ProgressSpinner from "primevue/progressspinner";

const { geocoding } = useApi();
const router = useRouter();
const toast = useToast();
const loading = ref(true);

const dto = reactive<ReverseGeocodingQueryDto>({
  longitude: undefined,
  latitude: undefined,
});

const geocodingResult = ref<ReverseGeocodingResultDto>();

function resolve() {
  geocoding.value
    .geocodingControllerReverseGeocoding({
      reverseGeocodingQueryDto: dto,
    })
    .then((result) => {
      geocodingResult.value = result;
    });
}
navigator.geolocation.getCurrentPosition(
  (pos) => {
    loading.value = false;
    dto.latitude = pos.coords.latitude;
    dto.longitude = pos.coords.longitude;
    resolve();
  },
  (err) => {
    toast.add({
      severity: "error",
      summary: "You must accept geolocation to use the service",
    });
  }
);

function validate() {
  router.push({
    name: "CreatePost",
    params: { locationId: geocodingResult.value?.placeId },
  });
}
</script>

<template>
  <PageLayout title="Create post">
    <ProgressSpinner v-if="loading" />
    <div v-else-if="geocodingResult">
      <div class="pb-3">We believe you are here :</div>
      <div class="pb-3 font-bold">
        {{ geocodingResult.displayName }}
      </div>
      <div>
        <Button label="Post at this location" @click="validate" />
      </div>
    </div>
  </PageLayout>
</template>
