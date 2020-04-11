import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入fleible.js
// import '@/assets/js/flexible.js';
// 导入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 导入axios
import axios from 'axios'
// 将axios绑定到vue的原型实例上
Vue.prototype.$axios = axios //全局注册，使用方法为:this.$axios
// 全局的 axios 默认值,基地址
axios.defaults.baseURL = 'http://127.0.0.1:3000';
Vue.config.productionTip = false

new Vue({
  router,
  model: 'history',
  render: h => h(App)
}).$mount('#app')