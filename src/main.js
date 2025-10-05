import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Pinia Confige
import { createPinia } from "pinia";

// Emitter Confige
import mitt from "mitt";

let Emitter = mitt();

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
// import this after install `@mdi/font` package
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
  .use(vuetify)
  .use(createPinia())
  .provide("Emitter", Emitter)
  .use(router)
  .mount("#app");
