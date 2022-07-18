import { ref, watch } from "vue";

const apiKey = await localStorage.getItem("APIKey");
export const loginToken = ref<string | undefined>(apiKey || undefined);

watch(loginToken, (value) => {
  localStorage.setItem("APIKey", value || "");
});
