<script setup lang="ts">
import { ref } from "vue";
import PublicPageLayout from "../components/layouts/PublicPageLayout.vue";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import { useApi } from "../hooks/useApi";

const { auth } = useApi();
const email = ref(""),
  name = ref(""),
  password = ref("");
const toast = useToast();
const router = useRouter();

function register() {
  auth.value
    .authControllerRegister({
      registerUserDto: {
        email: email.value,
        name: name.value,
        password: password.value,
      },
    })
    .then(() => {
      toast.add({
        severity: "success",
        summary: "User successfully created !",
      });
      router.push({ name: "Login" });
    })
    .catch((reason) => {
      alert("There was an error");
    });
}
</script>

<template>
  <PublicPageLayout title="Register">
    <FormKit type="form" submit-label="Register" @submit="register">
      <FormKit v-model="email" label="Email" validation="required|email" />
      <FormKit v-model="name" label="Name" validation="required" />
      <FormKit
        v-model="password"
        type="password"
        label="Password"
        validation="required"
      />
    </FormKit>
    <div>
      <router-link to="/login">Log in</router-link>
    </div>
  </PublicPageLayout>
</template>
