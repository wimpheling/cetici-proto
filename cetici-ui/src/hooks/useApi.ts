import { ref, watch } from "vue";
import {
  AuthControllerApi,
  Configuration,
  DefaultConfig,
  GeocodingControllerApi,
  PostControllerApi,
  CommentControllerApi,
  LikeControllerApi,
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
const getLikeClient = (token?: string) =>
  new LikeControllerApi(getConfig(token));

const auth = ref(getAuthClient(loginToken.value));
const posts = ref(getPostClient(loginToken.value));
const geocoding = ref(getGeocodingClient(loginToken.value));
const comments = ref(getCommentClient(loginToken.value));
const likes = ref(getLikeClient(loginToken.value));

export const useApi = () => {
  watch(loginToken, (newToken) => {
    auth.value = getAuthClient(newToken);
    posts.value = getPostClient(newToken);
    geocoding.value = getGeocodingClient(newToken);
    comments.value = getCommentClient(newToken);
    likes.value = getLikeClient(newToken);
  });
  return { auth, posts, geocoding, comments, likes };
};
