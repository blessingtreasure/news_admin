import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/post-list',
    component: () => import("@/views/post-list.vue"),
  }, {
    path: '/',
    component: () => import("@/views/index.vue"),
    // 创建首页的子路由
    children: [{
        // 文章列表
        path: 'post-list',
        component: () => import('@/views/post-list.vue')
      }, {
        // 发布文章
        path: 'post-public',
        component: () => import('@/views/post-public.vue')
      },
      {
        path: '/post-edit',
        component: () => import("@/views/post-edit.vue")
      }
    ]
  },

  {
    path: '/login',
    component: () => import("@/views/login.vue")
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router