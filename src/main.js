import Vue from "vue";
import VModal from "vue-js-modal/dist/index.nocss.js";
import App from "./App.vue";
import store from "./store";
import i18n from "./i18n";
import router from "./router";

import "./styles/style.css";
import "vue-select/dist/vue-select.css";

Vue.config.productionTip = false;

Vue.use(VModal, {
  dynamicDefaults: {
    adaptive: true,
  },
});

new Vue({
  store,
  i18n,
  router,
  render: (h) => h(App),
}).$mount("#app");
