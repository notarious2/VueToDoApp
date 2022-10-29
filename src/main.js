import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.js";
import "./axios";
import TheHeader from "../src/components/layout/TheHeader.vue";
import TheFooter from "../src/components/layout/TheFooter.vue";

import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fab, fas, far);

const app = createApp(App);

const pinia = createPinia();

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("the-header", TheHeader);
app.component("the-footer", TheFooter);

app.use(router);
pinia.use(piniaPersist);
app.use(pinia);

app.mount("#app");
