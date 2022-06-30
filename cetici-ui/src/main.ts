import { createApp } from "vue";
import App from "./App.vue";
import { plugin, defaultConfig } from "@formkit/vue";
import { createRouter, createWebHashHistory } from "vue-router";
import LoginPage from "./pages/LoginPage.vue";
import RegisterPage from "./pages/RegisterPage.vue";
import TestPage from "./pages/TestPage.vue";
import { loginToken } from "./hooks/useLoginToken";
import ToastService from "primevue/toastservice";
import PrimeVue from "primevue/config";

import "@formkit/themes/genesis";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
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
    component: TestPage,
  },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => !record.meta.public)) {
    console.log({ loginToken }, loginToken.value);
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!loginToken.value) {
      next({ name: "Login" });
    } else {
      next(); // go to wherever I'm going
    }
  } else {
    next(); // does not require auth, make sure to always call next()!
  }
});

createApp(App)
  .use(router)
  .use(PrimeVue)
  .use(ToastService)
  .use(plugin, defaultConfig)
  .mount("#app");
