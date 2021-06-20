// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
import ElementUI from "element-ui";
import VueLazyload from "vue-lazyload";
import "element-ui/lib/theme-chalk/index.css";
import VueResource from "vue-resource";
// import less from "less";
import axios from "axios";
import Cookies from "js-cookie";
import QS from "qs";
import cookie from "./util/cookie";
import Back from "./util/back";

Vue.prototype.cookie = cookie;
Vue.prototype.$axios = axios;
Vue.prototype.qs = QS;
// Vue.use(less);
Vue.use(VueResource);
Vue.use(ElementUI);
Vue.use(Cookies);
axios.defaults.withCredentials = false; //让ajax携带cook
Vue.config.productionTip = false;

Vue.use(MintUI);

axios.defaults.baseURL = "http://106.15.176.97:8080";

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  Back,
  components: { App },
  template: "<App/>",
});
