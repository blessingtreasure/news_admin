import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入fleible.js
// import '@/assets/js/flexible.js';
// 导入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  model: 'history',
  render: h => h(App)
}).$mount('#app')