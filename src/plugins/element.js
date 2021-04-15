import Vue from 'vue'
import { Button } from 'element-ui'
import { Form, FormItem } from 'element-ui'
import {Input} from 'element-ui'
import { Dialog } from 'element-ui'
import { Message } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Dialog)

// Message 需要全局挂载到 vue 的原型上
Vue.prototype.$message = Message