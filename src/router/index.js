/**
 * 路由文件
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入组件
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import User from '../components/users/User.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Report from '../components/Report/Report.vue'

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
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/users',
        component: User
      }, 
      {
        path: '/rights',
        component: Rights
      },
      {
        path: '/roles',
        component: Roles 
      },
      {
        path: '/reports',
        component: Report
      }
    ]
  }
]

// 创建路由实例
const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next)=>{
  // to 将要访问的路径
  // from 从哪个路径跳转而来
  // next 一个函数 表示放行 next()  或者  next('路径') 
  if(to.path === '/login') return next();
  // 获取 token
  const token = window.sessionStorage.getItem("token");
  // 没有 token 强制跳转到登录页面
  if(!token) return next('/login')
  next();
})

// 导出
export default router
