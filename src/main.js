import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import VueQriously from 'vue-qriously';
Vue.use(VueQriously);
// import axios from "axios";
import axios from "@/utils/api";
//anyD
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
Vue.use(Antd);
//El
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
//axios
Vue.prototype.$axios = axios;
// axios.defaults.baseURL = "http://192.168.0.247:8080";
axios.defaults.baseURL = "http://47.104.251.175:8080";
// axios.defaults.baseURL = "/api";
// Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
