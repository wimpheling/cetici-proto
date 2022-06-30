import { ref, watch } from "vue";
import {
  AuthControllerApi,
  Configuration,
  DefaultConfig,
} from "../openapi-client";
import { loginToken } from "./useLoginToken";

const getClient = (token?: string) =>
  new AuthControllerApi(
    new Configuration({
      ...DefaultConfig,
      basePath: "http://localhost:8083",
    })
  );

export const useApi = () => {
  watch(loginToken, (newToken) => {
    cli.value = getClient(loginToken.value);
  });
  const cli = ref(getClient());
  return cli;
};
