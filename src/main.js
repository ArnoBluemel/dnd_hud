import { createApp } from "vue";
import App from "./App.vue";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import OpenLayersMap from "vue3-openlayers";
import "vue3-openlayers/dist/vue3-openlayers.css";
import BootstrapVue3 from "bootstrap-vue-3";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

const app = createApp(App);
app.use(OpenLayersMap);
app.use(BootstrapVue3);
app.mount("#app");
