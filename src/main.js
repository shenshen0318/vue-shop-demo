/**
 * 整个项目的入口文件
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'

// 配置请求的根路径
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/"
// 将 axios 挂载到 vue 的原型上
Vue.prototype.$http = axios

// 导入全局样式表
import '../src/assets/global.css'
// 导入字体图标
import '../src/assets/icons/iconfont.css'

Vue.config.productionTip = false

// 创建了一个 vue 实例 通过 render 函数把 根组件渲染到了页面上
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
