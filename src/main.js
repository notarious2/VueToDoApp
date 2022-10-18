import { createApp } from "vue";
import App from "./App.vue";

import router from "./router.js";

import TheHeader from "../src/components/layout/TheHeader.vue";
import TheFooter from "../src/components/layout/TheFooter.vue";

import { createPinia } from "pinia";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fab, fas, far);

const app = createApp(App);

const pinia = createPinia();

// Router has to be used as a plugin in pinia
// pinia.use(({ store }) => {
//   store.router = markRaw(router);
// });

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("the-header", TheHeader);
app.component("the-footer", TheFooter);

app.use(router);
app.use(pinia);

app.mount("#app");
