// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";

Vue.prototype.$axios = axios;
Vue.prototype.AllaccessToken =
  "at.0te0pvhwd0onfqu7bhoegn9u0zu9wv3v-1la06dh8ja-12fyh6i-x02vs3gxg";
Vue.prototype.AlldeviceSerial = "E12366153";
Vue.config.productionTip = false;
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: {
    App
  },
  template: "<App/>"
});
