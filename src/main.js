import { createApp } from "vue";
import App from "./App.vue";

import router from "./router.js";

import axios from "axios";

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

axios.defaults.baseURL = "http://localhost:8000/";

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("the-header", TheHeader);
app.component("the-footer", TheFooter);

app.use(router);
app.use(pinia);

app.mount("#app");
