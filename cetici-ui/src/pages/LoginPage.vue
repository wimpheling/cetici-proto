<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useApi } from "../hooks/useApi";
import { loginToken } from "../hooks/useLoginToken";
import { useToast } from "primevue/usetoast";
import PublicPageLayout from "../components/layouts/PublicPageLayout.vue";

const { auth } = useApi();
const router = useRouter();
const toast = useToast();
const email = ref(""),
  password = ref("");
const formData = ref<{
  email?: string;
  password?: string;
}>({});
function login() {
  auth.value
    .authControllerLogin({
      authControllerLoginRequest: {
        email: email.value,
        password: password.value,
      },
    })
    .then((result) => {
      toast.add({ severity: "success", summary: "Login successful" });
      loginToken.value = result.token;
      router.push({ name: "Home" });
    })
    .catch((reason) => {
      alert("There was an error");
    });
}
</script>

<template>
  <PublicPageLayout title="Login">
    <FormKit
      v-model="formData"
      type="form"
      submit-label="Login"
      @submit="login"
    >
      <FormKit v-model="email" label="Email" validation="required|email" />
      <FormKit
        v-model="password"
        type="password"
        label="Password"
        validation="required"
      />
    </FormKit>
    <div>
      <router-link to="/register">Create an account</router-link>
    </div>
  </PublicPageLayout>
</template>

<style></style>
