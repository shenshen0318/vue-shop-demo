import Vue from 'vue'
import { Button, Form, FormItem, Input, Dialog, Message, Container, Header, Main,
  Menu, Submenu, MenuItem} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Dialog)
Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)

// Message 需要全局挂载到 vue 的原型上
Vue.prototype.$message = Message