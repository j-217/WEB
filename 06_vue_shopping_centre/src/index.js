// 导入Vue
import Vue from '../node_modules/vue/dist/vue.js'

// 按需导入mint-ui组件并使用
import { Header, Tabbar, TabItem } from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.component(Header.name, Header)
Vue.component(Tabbar.name, Tabbar)
Vue.component(TabItem.name, TabItem)

// 导入MUI样式表
import './MUI/css/mui.css'
// tabbar购物车图标需要导入icons-extra样式和字体文件
import './MUI/css/icons-extra.css'
import './MUI/fonts/mui-icons-extra.ttf'
// 轮播图
import { Swipe, SwipeItem } from 'mint-ui'

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

// 导入自定义组件
import app from './components/app.vue'

// 导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routerObj from './router.js'

var myVue = new Vue({
    el: '#app',
    render: createElement => createElement(app),
    router: routerObj,
})