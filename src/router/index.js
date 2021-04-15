/**
 * 路由文件
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入组件
import Login from '../components/Login.vue'

Vue.use(VueRouter)

// 路由信息配置
const routes = [
  // 路由重定向
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  }
]

// 创建路由实例
const router = new VueRouter({
  routes
})

// 导出
export default router
