import { createApp } from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";

import "./assets/main.css";

// Plugins & DI
import { installPlugins } from "./plugins";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Toast, {
  transition: "Vue-Toastification__fade",
  maxToasts: 3,
  toastClassName:
    "rounded-md shadow-md bg-white text-gray-800 border border-gray-200",
  bodyClassName: "text-sm px-3 py-2",
  position: "top-right",
  timeout: 3000,
});

installPlugins(app);

app.mount("#app");
