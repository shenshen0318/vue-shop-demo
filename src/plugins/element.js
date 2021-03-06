import Vue from 'vue'
import { Button, Form, FormItem, Input, Dialog, Message, Container, Header, Main, Aside,
  Menu, Submenu, MenuItem, Breadcrumb, BreadcrumbItem, Card, Row, Col, Table, TableColumn, Switch,
  Tooltip, Pagination, Progress, MessageBox, Tag, Tree, Select, Option} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Dialog)
Vue.use(Container)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Progress)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)

// Message 需要全局挂载到 vue 的原型上
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm