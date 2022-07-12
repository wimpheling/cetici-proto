import { ref, watch } from "vue";
import {
  AuthControllerApi,
  Configuration,
  DefaultConfig,
  GeocodingControllerApi,
  PostControllerApi,
  CommentControllerApi,
} from "../openapi-client";
import { loginToken } from "./useLoginToken";

const getConfig = (token?: string) =>
  new Configuration({
    ...DefaultConfig,
    basePath: "http://localhost:8083",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

const getAuthClient = (token?: string) =>
  new AuthControllerApi(getConfig(token));
const getPostClient = (token?: string) =>
  new PostControllerApi(getConfig(token));
const getGeocodingClient = (token?: string) =>
  new GeocodingControllerApi(getConfig(token));
const getCommentClient = (token?: string) =>
  new CommentControllerApi(getConfig(token));

const auth = ref(getAuthClient());
const posts = ref(getPostClient());
const geocoding = ref(getGeocodingClient());
const comments = ref(getCommentClient());

export const useApi = () => {
  watch(loginToken, (newToken) => {
    auth.value = getAuthClient(newToken);
    posts.value = getPostClient(newToken);
    geocoding.value = getGeocodingClient(newToken);
    comments.value = getCommentClient(newToken);
  });
  return { auth, posts, geocoding, comments };
};
