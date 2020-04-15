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
// axios.defaults.baseURL = "http://127.0.0.1:3000"
// 线上地址
axios.defaults.baseURL = "http://hmtoutiao-api.atlansic.com"
// 添加全局的路由守卫
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    const {
      token,
      user
    } = JSON.parse(localStorage.getItem('user_info')) || {};
    if (token && user.role.type === 'admin') {
      next();
    } else {
      // 如果不满足上面的条件，就跳转到登录页
      next("/login");
    }

  } else {
    // 如果是登录页,直接跳转
    next();
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  model: 'history',
  render: h => h(App)
}).$mount('#app')