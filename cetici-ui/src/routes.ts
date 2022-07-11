import LoginPage from "./pages/LoginPage.vue";
import RegisterPage from "./pages/RegisterPage.vue";
import IndexPage from "./pages/IndexPage.vue";
import CreatePostPage from "./pages/CreatePost/CreatePostPage.vue";
import ResolveGeolocation from "./pages/CreatePost/ResolveGeolocation.vue";

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
export const routes = [
  {
    name: "Register",
    path: "/register",
    component: RegisterPage,
    meta: {
      public: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
    meta: {
      public: true,
    },
  },
  {
    name: "Home",
    path: "/",
    component: IndexPage,
  },
  {
    name: "CreatePost",
    path: "/post/:locationId",
    component: CreatePostPage,
  },
  {
    name: "LocatePost",
    path: "/locate",
    component: ResolveGeolocation,
  },
];
